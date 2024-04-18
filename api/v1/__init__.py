from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
from flask_mail import Mail
from api.v1.config import Config 
from flask_jwt_extended import JWTManager

app = Flask(__name__)
mail = Mail()
JWTManager(app)
app.config.from_object(Config)
mail.init_app(app)
CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
### CORS section
@app.after_request
def after_request_func(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'Authorization')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                            'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)

    return response
### end CORS section
