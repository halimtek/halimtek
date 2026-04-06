from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta

app = FastAPI()

# --- 1. CORS CONFIGURATION (The Bridge) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. CONFIGURATION ---
SECRET_KEY = "HALIM_TEK_2026_SECRET"
ALGORITHM = "HS256"
ADMIN_EMAIL = "admin@halimtek.is-a.dev"
ADMIN_PASS = "halim123"

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return {"status": "Halim Tek API Active"}

# --- 3. THE LOGIN ROUTE ---
@app.post("/login")
async def login(request: LoginRequest):
    print(f"DEBUG: Attempt from {request.email}")
    
    # Validation Logic
    if request.email != ADMIN_EMAIL or request.password != ADMIN_PASS:
        print("❌ Login Failed: Credentials Mismatch")
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    # Generate JWT Token
    expiration = datetime.utcnow() + timedelta(hours=24)
    token = jwt.encode({"sub": request.email, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)

    print("✅ Login Success: Token Generated")
    return {"access_token": token, "token_type": "bearer"}