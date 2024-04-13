from flask import Flask, make_response, jsonify
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
