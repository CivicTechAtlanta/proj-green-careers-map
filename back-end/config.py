import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE = {
        'name': os.getenv('DB_DATABASE', 'directus'),
        'user': os.getenv('DB_USER', 'directus'),
        'password': os.getenv('DB_PASSWORD', 'password'),
        'host': os.getenv('DB_HOST', 'postgres'),
        'port': int(os.getenv('DB_PORT', '5432')),
    }
    
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    PORT = int(os.getenv('PORT', '5000'))
    HOST = os.getenv('HOST', '0.0.0.0')