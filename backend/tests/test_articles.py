"""Backend API tests for Article CMS, sitemap, image generation."""
import os
import time
import pytest
import requests

BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or "").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@alternativ-investieren.com"
ADMIN_PASSWORD = "AltInvest2026!Admin"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


@pytest.fixture
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Public articles ----------
class TestPublicArticles:
    def test_list_only_published(self):
        r = requests.get(f"{API}/articles", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # 3 seeded
        slugs = {a["slug"] for a in data}
        assert "crowdlending-vs-klassisches-sparen" in slugs
        assert "plattform-insolvenz-was-passiert-mit-meinem-geld" in slugs
        assert "nachrangdarlehen-einfach-erklaert" in slugs
        for a in data:
            assert a["status"] == "published"
            assert "_id" not in a

    def test_get_by_slug(self):
        r = requests.get(f"{API}/articles/nachrangdarlehen-einfach-erklaert", timeout=15)
        assert r.status_code == 200
        a = r.json()
        assert a["slug"] == "nachrangdarlehen-einfach-erklaert"
        assert a.get("metaTitle")
        assert a.get("metaDescription")
        assert isinstance(a.get("blocks"), list) and len(a["blocks"]) > 0

    def test_unknown_slug_404(self):
        r = requests.get(f"{API}/articles/does-not-exist-xyz", timeout=15)
        assert r.status_code == 404


# ---------- Admin articles ----------
class TestAdminArticles:
    def test_admin_list_requires_auth(self):
        r = requests.get(f"{API}/admin/articles", timeout=15)
        assert r.status_code == 401

    def test_admin_list_with_token(self, auth_headers):
        r = requests.get(f"{API}/admin/articles", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 3


# ---------- Article CRUD (incl. draft not in public, slug dup, publish shows in sitemap) ----------
class TestArticleCRUD:
    def test_full_lifecycle_and_sitemap(self, auth_headers):
        slug = "test-draft-article-crud"
        # Cleanup if present
        r_admin = requests.get(f"{API}/admin/articles", headers=auth_headers, timeout=15)
        for a in r_admin.json():
            if a["slug"] == slug:
                requests.delete(f"{API}/articles/{a['id']}", headers=auth_headers, timeout=15)

        # CREATE as draft
        payload = {
            "slug": slug,
            "title": "TEST_ Draft Article",
            "excerpt": "test excerpt",
            "metaTitle": "T",
            "metaDescription": "D",
            "status": "draft",
            "blocks": [{"type": "paragraph", "text": "Hello"}],
            "sources": [],
            "tags": ["test"],
            "published": "2026-01-01",
            "updated": "2026-01-01",
        }
        rc = requests.post(f"{API}/articles", json=payload, headers=auth_headers, timeout=15)
        assert rc.status_code == 200, rc.text
        aid = rc.json()["id"]

        # Not in public list
        pub = requests.get(f"{API}/articles", timeout=15).json()
        assert all(a["slug"] != slug for a in pub)

        # Public get 404 for draft
        r404 = requests.get(f"{API}/articles/{slug}", timeout=15)
        assert r404.status_code == 404

        # Duplicate slug POST -> 400
        rdup = requests.post(f"{API}/articles", json=payload, headers=auth_headers, timeout=15)
        assert rdup.status_code == 400

        # PUT to published
        upd = {**payload, "status": "published"}
        ru = requests.put(f"{API}/articles/{aid}", json=upd, headers=auth_headers, timeout=15)
        assert ru.status_code == 200
        assert ru.json()["status"] == "published"

        # Now in public list
        pub2 = requests.get(f"{API}/articles", timeout=15).json()
        assert any(a["slug"] == slug for a in pub2)

        # Sitemap now contains it
        rs = requests.get(f"{API}/sitemap.xml", timeout=15)
        assert rs.status_code == 200
        assert "application/xml" in rs.headers.get("content-type", "")
        assert f"/ratgeber/{slug}" in rs.text

        # DELETE
        rd = requests.delete(f"{API}/articles/{aid}", headers=auth_headers, timeout=15)
        assert rd.status_code == 200

        # Verify gone
        r404b = requests.get(f"{API}/articles/{slug}", timeout=15)
        assert r404b.status_code == 404


# ---------- Sitemap ----------
class TestSitemap:
    def test_sitemap_content(self):
        r = requests.get(f"{API}/sitemap.xml", timeout=15)
        assert r.status_code == 200
        assert "application/xml" in r.headers.get("content-type", "")
        body = r.text
        # Static
        assert "<loc>https://alternativ-investieren.com/</loc>" in body
        assert "/ratgeber/" in body
        assert "/crowdlending/" in body
        # Article URLs (3 seed)
        assert "/ratgeber/nachrangdarlehen-einfach-erklaert" in body
        assert "/ratgeber/crowdlending-vs-klassisches-sparen" in body
        # Provider URLs
        assert "/anbieter/mintos" in body
        assert "/anbieter/letsinvest" in body


# ---------- Providers regression ----------
class TestProviderRegression:
    def test_providers_9(self):
        r = requests.get(f"{API}/providers", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 9


# ---------- Image generation ----------
class TestImageGeneration:
    def test_unauth_401(self):
        r = requests.post(f"{API}/admin/generate-image", json={"prompt": "test"}, timeout=15)
        assert r.status_code == 401

    def test_generate_and_serve(self, auth_headers):
        r = requests.post(
            f"{API}/admin/generate-image",
            json={"prompt": "A minimalist financial illustration, blue tones, editorial"},
            headers=auth_headers,
            timeout=90,
        )
        # Allow 502 if LLM temporarily down but log
        if r.status_code == 502:
            pytest.skip(f"LLM image generation not available: {r.text}")
        assert r.status_code == 200, r.text
        media_path = r.json().get("media_path")
        assert media_path and media_path.startswith("alternativ-investieren/blog/")

        time.sleep(1)
        rm = requests.get(f"{API}/media/{media_path}", timeout=30)
        assert rm.status_code == 200
        ct = rm.headers.get("content-type", "")
        assert ct.startswith("image/")
        assert len(rm.content) > 500
