from peewee import *
from playhouse.postgres_ext import PostgresqlExtDatabase
from config import Config

database = PostgresqlExtDatabase(
    Config.DATABASE['name'],
    user=Config.DATABASE['user'],
    password=Config.DATABASE['password'],
    host=Config.DATABASE['host'],
    port=Config.DATABASE['port']
)

class BaseModel(Model):
    class Meta:
        database = database

class Job(BaseModel):
    id = AutoField(primary_key=True)
    category = CharField(max_length=255, null=False)
    job_name = CharField(max_length=255, null=False)
    job_description = TextField(null=True)
    skill_requirements = TextField(null=True)
    education_requirements = TextField(null=True)
    experience_requirements = TextField(null=True)
    base_hourly_rate = DecimalField(max_digits=10, decimal_places=2, null=True)
    max_hourly_rate = DecimalField(max_digits=10, decimal_places=2, null=True)
    base_annual_salary = IntegerField(null=True)
    max_annual_salary = IntegerField(null=True)
    created_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")])
    updated_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")])
    
    class Meta:
        table_name = 'jobs'
    
    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'job_name': self.job_name,
            'job_description': self.job_description,
            'skill_requirements': self.skill_requirements,
            'education_requirements': self.education_requirements,
            'experience_requirements': self.experience_requirements,
            'base_hourly_rate': float(self.base_hourly_rate) if self.base_hourly_rate else None,
            'max_hourly_rate': float(self.max_hourly_rate) if self.max_hourly_rate else None,
            'base_annual_salary': self.base_annual_salary,
            'max_annual_salary': self.max_annual_salary,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }