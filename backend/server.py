from dotenv import load_dotenv
from pathlib import Path
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import bcrypt
import jwt

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"

app = FastAPI(title="Alternativ Investieren API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Auth helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = None
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Nicht authentifiziert")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Ungültiger Token-Typ")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="Benutzer nicht gefunden")
        user["id"] = str(user["_id"])
        user.pop("_id", None)
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token abgelaufen")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Ungültiger Token")


# ---------- Models ----------
class LoginInput(BaseModel):
    email: str
    password: str


class Provider(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    logo_url: Optional[str] = ""
    asset_classes: List[str] = []          # e.g. ["crowdlending", "immobilien-crowdinvesting"]
    min_investment: Optional[float] = None  # EUR
    return_min: Optional[float] = None       # % p.a.
    return_max: Optional[float] = None       # % p.a.
    return_period: Optional[str] = ""        # z.B. "2019-2024"
    bafin_regulated: bool = False
    regulation_note: Optional[str] = ""       # z.B. "ECSP-Lizenz (EU)"
    term_min_months: Optional[int] = None
    term_max_months: Optional[int] = None
    risk_level: Optional[str] = "orange"      # green|yellow|orange|red
    secondary_market: bool = False
    countries: List[str] = ["DE"]
    rating: Optional[float] = None            # 0-5
    review_text: Optional[str] = ""
    affiliate_url: Optional[str] = "#"
    is_example: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ProviderCreate(BaseModel):
    name: str
    logo_url: Optional[str] = ""
    asset_classes: List[str] = []
    min_investment: Optional[float] = None
    return_min: Optional[float] = None
    return_max: Optional[float] = None
    return_period: Optional[str] = ""
    bafin_regulated: bool = False
    regulation_note: Optional[str] = ""
    term_min_months: Optional[int] = None
    term_max_months: Optional[int] = None
    risk_level: Optional[str] = "orange"
    secondary_market: bool = False
    countries: List[str] = ["DE"]
    rating: Optional[float] = None
    review_text: Optional[str] = ""
    affiliate_url: Optional[str] = "#"
    is_example: bool = True


# ---------- Auth routes ----------
@api_router.post("/auth/login")
async def login(data: LoginInput):
    email = data.email.strip().lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="E-Mail oder Passwort ungültig")
    token = create_access_token(str(user["_id"]), email)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": str(user["_id"]), "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")},
    }


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def logout():
    return {"message": "Abgemeldet"}


# ---------- Provider routes ----------
@api_router.get("/providers", response_model=List[Provider])
async def list_providers(category: Optional[str] = None):
    query = {}
    if category:
        query["asset_classes"] = category
    docs = await db.providers.find(query, {"_id": 0}).to_list(500)
    return [Provider(**d) for d in docs]


@api_router.get("/providers/{provider_id}", response_model=Provider)
async def get_provider(provider_id: str):
    doc = await db.providers.find_one({"id": provider_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Anbieter nicht gefunden")
    return Provider(**doc)


@api_router.post("/providers", response_model=Provider)
async def create_provider(data: ProviderCreate, user: dict = Depends(get_current_user)):
    provider = Provider(**data.model_dump())
    await db.providers.insert_one(provider.model_dump())
    return provider


@api_router.put("/providers/{provider_id}", response_model=Provider)
async def update_provider(provider_id: str, data: ProviderCreate, user: dict = Depends(get_current_user)):
    existing = await db.providers.find_one({"id": provider_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Anbieter nicht gefunden")
    update = data.model_dump()
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.providers.update_one({"id": provider_id}, {"$set": update})
    merged = {**existing, **update}
    return Provider(**merged)


@api_router.delete("/providers/{provider_id}")
async def delete_provider(provider_id: str, user: dict = Depends(get_current_user)):
    res = await db.providers.delete_one({"id": provider_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Anbieter nicht gefunden")
    return {"message": "Anbieter gelöscht"}


@api_router.get("/")
async def root():
    return {"message": "Alternativ Investieren API"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


SAMPLE_PROVIDERS = [
    {
        "name": "Beispiel-Plattform Alpha", "logo_url": "", "asset_classes": ["crowdlending"],
        "min_investment": 25, "return_min": 6.0, "return_max": 9.5, "return_period": "2019-2024",
        "bafin_regulated": False, "regulation_note": "ECSP-Lizenz (EU-Schwarmfinanzierungs-VO)",
        "term_min_months": 6, "term_max_months": 36, "risk_level": "orange", "secondary_market": True,
        "countries": ["DE", "AT"], "rating": 4.2,
        "review_text": "Beispieldaten – redaktionelle Kurzbewertung wird später ergänzt. Diese Karte dient als Platzhalter für die spätere Anbieter-Befüllung.",
        "affiliate_url": "#", "is_example": True,
    },
    {
        "name": "Beispiel-Plattform Beta", "logo_url": "", "asset_classes": ["immobilien-crowdinvesting"],
        "min_investment": 500, "return_min": 5.0, "return_max": 7.0, "return_period": "2020-2024",
        "bafin_regulated": True, "regulation_note": "Vermögensanlagengesetz / BaFin-gebilligter VIB",
        "term_min_months": 12, "term_max_months": 48, "risk_level": "orange", "secondary_market": False,
        "countries": ["DE"], "rating": 3.9,
        "review_text": "Beispieldaten – redaktionelle Kurzbewertung wird später ergänzt. Diese Karte dient als Platzhalter für die spätere Anbieter-Befüllung.",
        "affiliate_url": "#", "is_example": True,
    },
    {
        "name": "Beispiel-Plattform Gamma", "logo_url": "", "asset_classes": ["crowdlending", "immobilien-crowdinvesting"],
        "min_investment": 100, "return_min": 4.5, "return_max": 8.0, "return_period": "2018-2024",
        "bafin_regulated": False, "regulation_note": "ECSP-Lizenz (EU)",
        "term_min_months": 3, "term_max_months": 60, "risk_level": "yellow", "secondary_market": True,
        "countries": ["DE", "AT", "CH"], "rating": 4.5,
        "review_text": "Beispieldaten – redaktionelle Kurzbewertung wird später ergänzt. Diese Karte dient als Platzhalter für die spätere Anbieter-Befüllung.",
        "affiliate_url": "#", "is_example": True,
    },
]


@app.on_event("startup")
async def startup():
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").strip().lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    try:
        await db.users.create_index("email", unique=True)
    except Exception as e:
        logger.warning(f"index: {e}")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email, "password_hash": hash_password(admin_password),
            "name": "Redaktion", "role": "admin", "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin seeded.")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated.")

    # Seed sample providers (only if none exist)
    count = await db.providers.count_documents({})
    if count == 0:
        for p in SAMPLE_PROVIDERS:
            provider = Provider(**p)
            await db.providers.insert_one(provider.model_dump())
        logger.info("Sample providers seeded.")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
