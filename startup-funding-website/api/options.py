from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/options")
async def get_options():
    BASE_DIR = Path(__file__).resolve().parent.parent.parent / "models"
    with open(BASE_DIR / 'categorical_options.json', 'r') as f:
        return json.load(f)
