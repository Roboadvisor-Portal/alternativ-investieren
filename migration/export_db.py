"""Exportiert die MongoDB-Inhalte (Artikel + Anbieter) als portable JSON-Dateien."""
import os, json, pathlib
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")
client = MongoClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

out = pathlib.Path("/app/migration/data")
out.mkdir(parents=True, exist_ok=True)

for coll in ["articles", "providers", "media"]:
    docs = list(db[coll].find({}, {"_id": 0}))
    (out / f"{coll}.json").write_text(json.dumps(docs, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{coll}: {len(docs)} Dokumente exportiert")
