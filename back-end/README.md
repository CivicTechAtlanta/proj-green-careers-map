# Green Careers API

Flask API for serving green job data using Peewee ORM and PostgreSQL.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file with database configuration:
```
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=proj_green_careers_map
DB_USER=username
DB_PASSWORD=password
FLASK_ENV=development
DEBUG=True
HOST=0.0.0.0
PORT=5000
```

3. Start PostgreSQL database

4. Create database tables:
```bash
python migrate.py
```

5. Initialize data from CSV:
```bash
python init_data.py
```

6. Run the API server:
```bash
python run.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/<id>` - Get specific job by ID
- `GET /api/categories` - Get all unique categories
