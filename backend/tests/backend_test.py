"""Backend API tests for alternativ-investieren.com portal."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or "https://alt-invest-preview.preview.emergentagent.com"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@alternativ-investieren.com"
ADMIN_PASSWORD = "AltInvest2026!Admin"


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "access_token" in data
    assert data["user"]["email"] == ADMIN_EMAIL
    assert data["user"]["role"] == "admin"
    return data["access_token"]


@pytest.fixture
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Auth ----------
class TestAuth:
    def test_login_success(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
        assert r.status_code == 200
        j = r.json()
        assert j["token_type"].lower() == "bearer"
        assert "access_token" in j and len(j["access_token"]) > 20

    def test_login_wrong_password_401_german(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=15)
        assert r.status_code == 401
        detail = r.json().get("detail", "")
        assert "ungültig" in detail.lower() or "ungueltig" in detail.lower()

    def test_me_without_token_401(self):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_token(self, auth_headers):
        r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        j = r.json()
        assert j["email"] == ADMIN_EMAIL
        assert j["role"] == "admin"


# ---------- Providers listing/filter ----------
class TestProvidersList:
    def test_list_all(self):
        r = requests.get(f"{API}/providers", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 3
        # Ensure no _id leakage
        assert all("_id" not in p for p in data)
        assert all("id" in p for p in data)

    def test_filter_crowdlending(self):
        r = requests.get(f"{API}/providers", params={"category": "crowdlending"}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        for p in data:
            assert "crowdlending" in p["asset_classes"]

    def test_filter_immobilien(self):
        r = requests.get(f"{API}/providers", params={"category": "immobilien-crowdinvesting"}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        for p in data:
            assert "immobilien-crowdinvesting" in p["asset_classes"]


# ---------- Provider CRUD ----------
class TestProviderCRUD:
    def test_unauth_post_rejected(self):
        r = requests.post(f"{API}/providers", json={"name": "TEST_Unauth"}, timeout=15)
        assert r.status_code == 401

    def test_unauth_put_rejected(self):
        r = requests.put(f"{API}/providers/does-not-exist", json={"name": "x"}, timeout=15)
        assert r.status_code == 401

    def test_unauth_delete_rejected(self):
        r = requests.delete(f"{API}/providers/does-not-exist", timeout=15)
        assert r.status_code == 401

    def test_full_crud_flow(self, auth_headers):
        payload = {
            "name": "TEST_Provider_CRUD",
            "asset_classes": ["crowdlending"],
            "min_investment": 50,
            "return_min": 5.0,
            "return_max": 8.0,
            "bafin_regulated": True,
            "regulation_note": "TEST",
            "risk_level": "yellow",
            "is_example": True,
        }
        # CREATE
        rc = requests.post(f"{API}/providers", json=payload, headers=auth_headers, timeout=15)
        assert rc.status_code == 200, rc.text
        created = rc.json()
        pid = created["id"]
        assert created["name"] == payload["name"]
        assert created["bafin_regulated"] is True

        # GET (verify persistence)
        rg = requests.get(f"{API}/providers/{pid}", timeout=15)
        assert rg.status_code == 200
        assert rg.json()["name"] == payload["name"]

        # UPDATE
        upd = {**payload, "name": "TEST_Provider_CRUD_Updated", "return_max": 9.9}
        ru = requests.put(f"{API}/providers/{pid}", json=upd, headers=auth_headers, timeout=15)
        assert ru.status_code == 200
        assert ru.json()["name"] == "TEST_Provider_CRUD_Updated"
        assert ru.json()["return_max"] == 9.9

        # Verify update persisted
        rg2 = requests.get(f"{API}/providers/{pid}", timeout=15)
        assert rg2.json()["name"] == "TEST_Provider_CRUD_Updated"

        # DELETE
        rd = requests.delete(f"{API}/providers/{pid}", headers=auth_headers, timeout=15)
        assert rd.status_code == 200

        # Verify gone
        rg3 = requests.get(f"{API}/providers/{pid}", timeout=15)
        assert rg3.status_code == 404
