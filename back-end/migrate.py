from models.job import database, Job

def create_tables():
    """Create database tables"""
    try:
        database.connect()
        database.create_tables([Job])
        print("Tables created successfully")
    except Exception as e:
        print(f"Error creating tables: {e}")
    finally:
        if not database.is_closed():
            database.close()

if __name__ == "__main__":
    create_tables()