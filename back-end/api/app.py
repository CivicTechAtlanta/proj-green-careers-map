from flask import Flask, jsonify, request
from models.job import database, Job
import atexit

def create_app():
    app = Flask(__name__)
    
    # Connect to database
    database.connect()
    
    # Get all jobs
    @app.route('/api/jobs', methods=['GET'])
    def get_jobs():
        try:
            jobs = Job.select()
            jobs_list = [job.to_dict() for job in jobs]
            return jsonify({'jobs': jobs_list, 'count': len(jobs_list)})
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # Get specific job by ID
    @app.route('/api/jobs/<int:job_id>', methods=['GET'])
    def get_job(job_id):
        try:
            job = Job.get_by_id(job_id)
            return jsonify(job.to_dict())
        except Job.DoesNotExist:
            return jsonify({'error': 'Job not found'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # Get all unique categories
    @app.route('/api/categories', methods=['GET'])
    def get_categories():
        try:
            categories = Job.select(Job.category).distinct()
            categories_list = [cat.category for cat in categories]
            return jsonify({'categories': categories_list})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # Close database connection on app shutdown
    @atexit.register
    def close_db():
        if not database.is_closed():
            database.close()
    
    return app