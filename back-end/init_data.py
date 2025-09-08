import csv
import os
from models.job import database, Job

def init_jobs_from_csv():
    """Load job data from CSV into PostgreSQL database"""
    csv_path = os.path.join(os.path.dirname(__file__), 'jobs.csv')
    
    if not os.path.exists(csv_path):
        print(f"CSV file not found at {csv_path}")
        return
    
    try:
        database.connect()
        
        # Clear existing data
        Job.delete().execute()
        print("Cleared existing job data")
        
        job_count = 0
        with open(csv_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            for row in reader:
                # Handle empty values
                base_hourly = float(row['base_hourly_rate']) if row['base_hourly_rate'] else None
                max_hourly = float(row['max_hourly_rate']) if row['max_hourly_rate'] else None
                base_annual = int(row['base_annual_salary']) if row['base_annual_salary'] else None
                max_annual = int(row['max_annual_salary']) if row['max_annual_salary'] else None
                
                Job.create(
                    category=row['category'],
                    job_name=row['job_name'],
                    job_description=row['job_description'],
                    skill_requirements=row['skill_requirements'],
                    education_requirements=row['education_requirements'],
                    experience_requirements=row['experience_requirements'],
                    base_hourly_rate=base_hourly,
                    max_hourly_rate=max_hourly,
                    base_annual_salary=base_annual,
                    max_annual_salary=max_annual
                )
                job_count += 1
        
        print(f"Successfully initialized {job_count} jobs from CSV")
        
    except Exception as e:
        print(f"Error initializing data: {e}")
    finally:
        if not database.is_closed():
            database.close()

if __name__ == "__main__":
    init_jobs_from_csv()