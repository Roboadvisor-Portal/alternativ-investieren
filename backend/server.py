from dotenv import load_dotenv
from pathlib import Path
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any
import uuid
import base64
import requests
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import bcrypt
import jwt
from emergentintegrations.llm.chat import LlmChat, UserMessage
from seed_articles import SEED_ARTICLES

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"

# ---------- Emergent Object Storage ----------
APP_NAME = "alternativ-investieren"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
_storage_key = None


def init_storage(force: bool = False):
    global _storage_key
    if _storage_key and not force:
        return _storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    _storage_key = resp.json()["storage_key"]
    return _storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120,
    )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    key = init_storage()
    resp = requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key}, timeout=60,
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

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
    star_rating: Optional[float] = None       # redaktionelle Sterne 0-5 (halbe möglich)
    trustpilot_score: Optional[float] = None
    trustpilot_count: Optional[int] = None
    trustpilot_url: Optional[str] = ""
    regulation_tier: Optional[str] = "tier2"  # tier1|tier2|tier3
    slug: Optional[str] = ""
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
    star_rating: Optional[float] = None
    trustpilot_score: Optional[float] = None
    trustpilot_count: Optional[int] = None
    trustpilot_url: Optional[str] = ""
    regulation_tier: Optional[str] = "tier2"
    slug: Optional[str] = ""
    review_text: Optional[str] = ""
    affiliate_url: Optional[str] = "#"
    is_example: bool = True


class Article(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: Optional[str] = ""
    metaTitle: Optional[str] = ""
    metaDescription: Optional[str] = ""
    category: Optional[str] = "crowdlending"
    tags: List[str] = []
    author: Optional[str] = "Markus G"
    published: Optional[str] = ""
    updated: Optional[str] = ""
    readingTime: Optional[int] = 5
    status: Optional[str] = "published"          # published | draft
    heroImage: Optional[str] = ""
    heroAlt: Optional[str] = ""
    answerFirst: Optional[str] = ""
    blocks: List[Any] = []
    sources: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ArticleCreate(BaseModel):
    slug: str
    title: str
    excerpt: Optional[str] = ""
    metaTitle: Optional[str] = ""
    metaDescription: Optional[str] = ""
    category: Optional[str] = "crowdlending"
    tags: List[str] = []
    author: Optional[str] = "Markus G"
    published: Optional[str] = ""
    updated: Optional[str] = ""
    readingTime: Optional[int] = 5
    status: Optional[str] = "published"
    heroImage: Optional[str] = ""
    heroAlt: Optional[str] = ""
    answerFirst: Optional[str] = ""
    blocks: List[Any] = []
    sources: List[str] = []


class ImagePrompt(BaseModel):
    prompt: str
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


# ---------- Article (Blog/CMS) routes ----------
@api_router.get("/articles", response_model=List[Article])
async def list_articles(category: Optional[str] = None):
    query = {"status": "published"}
    if category:
        query["category"] = category
    docs = await db.articles.find(query, {"_id": 0}).to_list(500)
    docs.sort(key=lambda d: d.get("published", ""), reverse=True)
    return [Article(**d) for d in docs]


@api_router.get("/admin/articles", response_model=List[Article])
async def admin_list_articles(user: dict = Depends(get_current_user)):
    docs = await db.articles.find({}, {"_id": 0}).to_list(500)
    docs.sort(key=lambda d: d.get("published", ""), reverse=True)
    return [Article(**d) for d in docs]


@api_router.get("/articles/{slug}", response_model=Article)
async def get_article(slug: str):
    doc = await db.articles.find_one({"slug": slug, "status": "published"}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Artikel nicht gefunden")
    return Article(**doc)


@api_router.post("/articles", response_model=Article)
async def create_article(data: ArticleCreate, user: dict = Depends(get_current_user)):
    if await db.articles.find_one({"slug": data.slug}):
        raise HTTPException(status_code=400, detail="Slug bereits vergeben")
    article = Article(**data.model_dump())
    await db.articles.insert_one(article.model_dump())
    return article


@api_router.put("/articles/{article_id}", response_model=Article)
async def update_article(article_id: str, data: ArticleCreate, user: dict = Depends(get_current_user)):
    existing = await db.articles.find_one({"id": article_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Artikel nicht gefunden")
    dup = await db.articles.find_one({"slug": data.slug, "id": {"$ne": article_id}})
    if dup:
        raise HTTPException(status_code=400, detail="Slug bereits vergeben")
    update = data.model_dump()
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.articles.update_one({"id": article_id}, {"$set": update})
    merged = {**existing, **update}
    return Article(**merged)


@api_router.delete("/articles/{article_id}")
async def delete_article(article_id: str, user: dict = Depends(get_current_user)):
    res = await db.articles.delete_one({"id": article_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Artikel nicht gefunden")
    return {"message": "Artikel gelöscht"}


# ---------- KI-Bildgenerierung + Media ----------
@api_router.post("/admin/generate-image")
async def generate_image(data: ImagePrompt, user: dict = Depends(get_current_user)):
    try:
        chat = LlmChat(api_key=EMERGENT_KEY, session_id=str(uuid.uuid4()),
                       system_message="Du erstellst redaktionelle, seriöse Beitragsbilder für ein Finanz-Fachportal.")
        chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
        msg = UserMessage(text=data.prompt)
        _text, images = await chat.send_message_multimodal_response(msg)
    except Exception as e:
        logger.error(f"Bildgenerierung fehlgeschlagen: {e}")
        raise HTTPException(status_code=502, detail="Bildgenerierung fehlgeschlagen")
    if not images:
        raise HTTPException(status_code=502, detail="Keine Bilddaten erhalten")
    img = images[0]
    image_bytes = base64.b64decode(img["data"])
    mime = img.get("mime_type", "image/png")
    ext = "png" if "png" in mime else ("jpg" if "jpe" in mime else "png")
    path = f"{APP_NAME}/blog/{uuid.uuid4()}.{ext}"
    try:
        result = put_object(path, image_bytes, mime)
    except Exception as e:
        logger.error(f"Upload fehlgeschlagen: {e}")
        raise HTTPException(status_code=502, detail="Speichern des Bildes fehlgeschlagen")
    stored_path = result.get("path", path)
    await db.media.insert_one({
        "id": str(uuid.uuid4()),
        "storage_path": stored_path,
        "content_type": mime,
        "prompt": data.prompt[:500],
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"media_path": stored_path}


@api_router.get("/media/{path:path}")
async def serve_media(path: str):
    record = await db.media.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="Bild nicht gefunden")
    try:
        data, content_type = get_object(path)
    except Exception:
        init_storage(force=True)
        data, content_type = get_object(path)
    return Response(content=data, media_type=record.get("content_type", content_type))


# ---------- Dynamische sitemap.xml (aktualisiert sich bei jedem Publish) ----------
@api_router.get("/sitemap.xml")
async def sitemap():
    SITE = "https://alternativ-investieren.com"
    static_urls = [
        ("/", "weekly", "1.0"),
        ("/crowdlending/", "weekly", "0.9"),
        ("/immobilien-crowdinvesting/", "weekly", "0.9"),
        ("/rechner/", "monthly", "0.7"),
        ("/rechner/rendite-szenario-rechner", "monthly", "0.7"),
        ("/rechner/diversifikations-rechner", "monthly", "0.7"),
        ("/rechner/steuer-rechner-kapitalertraege", "monthly", "0.7"),
        ("/ratgeber/", "weekly", "0.8"),
        ("/glossar/", "monthly", "0.8"),
        ("/wie-wir-bewerten/", "yearly", "0.5"),
        ("/risikohinweise/", "yearly", "0.6"),
        ("/ueber-uns/", "yearly", "0.5"),
        ("/downloads/", "monthly", "0.5"),
        ("/impressum/", "yearly", "0.3"),
        ("/datenschutz/", "yearly", "0.3"),
    ]
    parts = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, cf, pr in static_urls:
        parts.append(f"<url><loc>{SITE}{loc}</loc><changefreq>{cf}</changefreq><priority>{pr}</priority></url>")
    articles = await db.articles.find({"status": "published"}, {"_id": 0, "slug": 1, "updated": 1}).to_list(500)
    for a in articles:
        lastmod = f"<lastmod>{a['updated']}</lastmod>" if a.get("updated") else ""
        parts.append(f"<url><loc>{SITE}/ratgeber/{a['slug']}</loc>{lastmod}<changefreq>monthly</changefreq><priority>0.8</priority></url>")
    providers = await db.providers.find({}, {"_id": 0, "slug": 1}).to_list(500)
    for p in providers:
        if p.get("slug"):
            parts.append(f"<url><loc>{SITE}/anbieter/{p['slug']}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>")
    parts.append("</urlset>")
    return Response(content="\n".join(parts), media_type="application/xml")


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


def P(name, slug, ac, mn, rmin, rmax, rp, bafin, regnote, tmin, tmax, risk, sec, countries, star, tp, tpc, tpurl, tier, review):
    return {"name": name, "slug": slug, "logo_url": "", "asset_classes": ac, "min_investment": mn,
            "return_min": rmin, "return_max": rmax, "return_period": rp, "bafin_regulated": bafin,
            "regulation_note": regnote, "term_min_months": tmin, "term_max_months": tmax,
            "risk_level": risk, "secondary_market": sec, "countries": countries, "rating": star,
            "star_rating": star, "trustpilot_score": tp, "trustpilot_count": tpc, "trustpilot_url": tpurl,
            "regulation_tier": tier, "review_text": review, "affiliate_url": "#", "is_example": True}


SAMPLE_PROVIDERS = [
    P("Debitum Investments", "debitum", ["crowdlending"], 10, 8, 15, "hist. Ø ~12–12,8 %", False,
      "MiFID-II, Latvijas Banka, Lizenz 06.06.08.728/537", 3, 12, "yellow", False, ["LV", "EE", "GB", "ES"],
      4.5, 4.0, 134, "https://www.trustpilot.com/review/debitum.investments", "tier1",
      "Besicherte P2B-Unternehmenskredite, MiFID-II-reguliert mit Anlegerentschädigung bis 20.000 €. Laut Anbieter praktisch keine Ausfälle. Kein Sekundärmarkt."),
    P("Viainvest", "viainvest", ["crowdlending"], 10, 10, 13, "seit 2016", False,
      "IBF-Lizenz, Latvijas Banka, MiFID-II", 1, 12, "yellow", True, ["LV", "CZ", "RO"],
      3.5, 2.8, 53, "https://www.trustpilot.com/review/viainvest.com", "tier1",
      "Kurzfristige Konsumkredite der VIA SMS Group mit Rückkauf- und Konzerngarantie. Sekundärmarkt vorhanden. Klumpenrisiko durch Konzernbindung."),
    P("Mintos", "mintos", ["crowdlending"], 5, 9, 14, "seit 2015", False,
      "MiFID-II, Latvijas Banka, Anlegerentschädigung bis 20.000 €", 1, 36, "yellow", True, ["LV", "EU"],
      4.5, 3.9, 4500, "https://www.trustpilot.com/review/mintos.com", "tier1",
      "Größter P2P-Marktplatz Europas, über 80 Kreditanbahner, hohe Transparenz (Mintos-Score). Bruttorenditen vor Ausfällen; nicht jeder Kredit mit Rückkauf."),
    P("Lendermarket", "lendermarket", ["crowdlending"], 10, 13, 18, "Ø ~13,5 %", False,
      "ECSP-Lizenz, Central Bank of Ireland (seit 12/2024)", 1, 84, "orange", False, ["EE", "ES", "EU"],
      3.5, 4.0, 718, "https://www.trustpilot.com/review/lendermarket.com", "tier2",
      "Creditstar-Plattform, seit 12/2024 ECSP-lizenziert. Wichtig: Liquiditätskrise 2022–2024 (Pending Payments), laut Anbieter 10/2025 vollständig beglichen. Klumpenrisiko Creditstar."),
    P("Maclear", "maclear", ["crowdlending"], 50, 14, 15.6, "seit 2023", False,
      "Schweizer AG, SRO PolyReg (nur indirekte FINMA-Aufsicht)", 3, 18, "red", False, ["CH", "EE", "EU"],
      3.0, 4.6, 660, "https://www.trustpilot.com/review/maclear.ch", "tier3",
      "Junge P2B-Plattform mit hohen Renditen. Nur SRO-Mitgliedschaft statt echter Finanzlizenz, keine Rückkaufgarantie, keine geprüften Geschäftsberichte, erster Ausfall 2025 dokumentiert."),
    P("LetsInvest", "letsinvest", ["immobilien-crowdinvesting"], 500, 10, 12.5, "hist. ~10–10,5 %", False,
      "ECSP-Lizenz, Bank von Litauen (Bezüge CNMV/CMVM)", 12, 18, "yellow", False, ["LT", "ES", "PT"],
      4.0, None, None, "", "tier2",
      "Konservativ aufgestelltes Immobilien-Crowdinvesting: ~95 % erstrangig besichert, LTV max. 70–75 %, seit 2020 kein Zahlungsverzug bei ~129 Mio. € Volumen. Keine Trustpilot-Daten."),
    P("Stock.estate", "stock-estate", ["immobilien-crowdinvesting"], 500, 12, 18, "seit 2023/24", False,
      "ECSP-Lizenz, ASF Rumänien, Lizenz PJR28FSFPR/400002", 6, 18, "orange", False, ["RO", "PT"],
      3.5, 4.6, 19, "https://www.trustpilot.com/review/stock.estate", "tier2",
      "Grundpfandbesicherte Immobilienkredite (~150 % Besicherung), hohe Bruttorenditen. Starke Länderkonzentration Rumänien, junger Track Record. Gebühren mindern Bruttorendite."),
    P("Fintown", "fintown", ["immobilien-crowdinvesting"], 100, 8, 15, "seit 2022/23", False,
      "Unreguliert – keine Finanzaufsichtslizenz", 6, 24, "red", False, ["CZ"],
      2.5, None, None, "", "tier3",
      "Miet- und Entwicklungsprojekte der Vihorev-Gruppe in Prag. Unreguliert, keine Grundpfand-/Rückkaufsicherung Dritter. Interessenkonflikt: CEO = Garantiegeber. Ausstiegsgebühr bis 30 %."),
    P("Crowdpear", "crowdpear", ["immobilien-crowdinvesting"], 100, 10.5, 14, "seit 2023", False,
      "ECSP-Lizenz, Zentralbank Litauens (seit 07/2023)", 6, 24, "yellow", True, ["LT", "RO"],
      4.0, 4.3, 31, "https://www.trustpilot.com/review/crowdpear.com", "tier2",
      "PeerBerry-Spin-off, erstrangig hypothekenbesichert, konservativer Ø-LTV 58,4 %. Niedrige Ausfallquoten, Sekundärmarkt vorhanden. Junger Track Record, Fokus Litauen."),
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

    # Seed sample providers (reseed if the new dataset is not yet present)
    has_mintos = await db.providers.find_one({"slug": "mintos"})
    if has_mintos is None:
        await db.providers.delete_many({"is_example": True})
        for p in SAMPLE_PROVIDERS:
            provider = Provider(**p)
            await db.providers.insert_one(provider.model_dump())
        logger.info("Sample providers reseeded (9 real profiles).")

    # Seed/migrate launch articles (idempotent by slug)
    for a in SEED_ARTICLES:
        exists = await db.articles.find_one({"slug": a["slug"]})
        if exists is None:
            article = Article(**a)
            await db.articles.insert_one(article.model_dump())
            logger.info(f"Article migrated: {a['slug']}")

    # Init object storage (non-fatal if unavailable)
    try:
        init_storage()
        logger.info("Object storage initialized.")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
