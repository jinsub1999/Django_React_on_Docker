import os
from os import environ, path
from pathlib import Path
from dotenv import load_dotenv

dotenv_path = path.join(
    Path(__file__).resolve().parent.parent.parent, ".env")
load_dotenv(dotenv_path)
localenv = path.join(
    Path(__file__).resolve().parent.parent.parent, ".env.local")
load_dotenv(localenv)
DATABASE = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PW"),
        "HOST": "127.0.0.1" if os.environ.get("DEBUG__ON_LOCAL") else "db",
        "PORT": "3306",
        "OPTIONS": {
            "charset": "utf8"
        },
    }
}
DJANGO_SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
