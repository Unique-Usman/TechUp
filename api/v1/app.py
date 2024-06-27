#!/usr/bin/python3
"""
Entry point for the api
"""
from flask import make_response, jsonify
from api.v1 import app

from models import storage
from api.v1.views import app_views
from os import getenv


app.register_blueprint(app_views)


@app.teardown_appcontext
def clean_up(exception=None):
    """
    Close all the action of the database
    """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """
    Handles 404 Not found error
    """
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == "__main__":
    host = getenv("HBNB_API_HOST") if getenv("HBNB_API_HOST") else "0.0.0.0"
    port = getenv("HBNB_API_PORT") if getenv("HBNB_API_PORT") else 5000
    app.run(host=host, port=port, threaded=True, debug=True)
