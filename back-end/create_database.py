import csv
import os
import sqlite3

# Read jobs from CSV file from current directory
# Get absolute path of jobs.csv
csv_path = os.path.join(os.path.dirname(__file__), 'jobs.csv')
data = csv.DictReader(open(csv_path))

# Connect to SQLite database
conn = sqlite3.connect('jobs.db')
c = conn.cursor()
c.execute('''
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY,
        category TEXT,
        job_name TEXT,
        job_description TEXT,
        skill_requirements TEXT,
        education_requirements TEXT,
        experience_requirements TEXT,
        base_hourly_rate REAL,
        max_hourly_rate REAL,
        base_annual_salary INTEGER,
        max_annual_salary INTEGER
    )
''')
conn.commit()
for job in data:
    c.execute('''
        INSERT INTO jobs (category, job_name, job_description, skill_requirements, education_requirements, experience_requirements, base_hourly_rate, max_hourly_rate, base_annual_salary, max_annual_salary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (job['category'], job['job_name'], job['job_description'], job['skill_requirements'], job['education_requirements'], job['experience_requirements'], job['base_hourly_rate'], job['max_hourly_rate'], job['base_annual_salary'], job['max_annual_salary']))
conn.commit()
