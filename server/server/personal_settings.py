import os
from os import path
from pathlib import Path
from dotenv import load_dotenv

dotenv_path = path.join(
    Path(__file__).resolve().parent.parent.parent, ".env.local")
load_dotenv(dotenv_path)
DATABASE = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PW"),
        # "HOST": "localhost", # local mysql
        "HOST": "172.17.0.2",  # docker mysql
        "PORT": "3306",
        "OPTIONS": {
            "charset": "utf8"
        },
    }
}
DJANGO_SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
