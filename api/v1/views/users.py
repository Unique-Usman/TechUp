#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the User object
"""
from api.v1.views import app_views
from models.user import User
from flask import abort, jsonify, request
import validators
from models import storage
from werkzeug.security import check_password_hash, generate_password_hash
from api.v1.views.utils import send_confirm_email, get_token, verify_reset_token


@app_views.route("/users", strict_slashes=False)
def get_users():
    """
    Retrieves all the User objects from the database and
    returns a list containing them
    """
    all_users = storage.all(User)
    all_users_list = []
    for user in all_users.values():
        all_users_list.append(user.to_dict())
    return jsonify(all_users_list)

@app_views.route("/register", methods=["POST"], strict_slashes=False)
def create_user():
    """
    Creates a new user
    """
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    content = request.get_json()
    if "password" not in content:
        return jsonify({"message": "Missing password"}), 400
    if "email" not in content:
        return jsonify({"message": "Missing email"}), 400
    email = content.get("email")
    existing_email = storage.get(User, email=email)
    if len(existing_email) > 0:
        existing_email = existing_email[0]
    if existing_email:
        return jsonify({
            'error': "A user with this email address already exists"}
            ), 400
    if not validators.email(email):
        return jsonify({'error': "Email is not valid"}), 400
    if "github" not in content:
        return jsonify({"message": "Missing Github link"}), 400
    # if "username" not in content:
        # return jsonify({"message": "Missing User name"}), 400
    token = get_token(email)
    password = content.get("password")
    pwd_hash = generate_password_hash(password)
    user = User()
    for key, value in content.items():
        if key not in ["id", "created_at", "updated_at", "password"]:
            setattr(user, key, value)
    setattr(user, "password", pwd_hash)
    setattr(user, "confirmed", False)
    storage.new(user)
    storage.save()
    send_confirm_email(email, token)
    return jsonify(user.to_dict()), 201

@app_views.route('/confirm-email', methods=['GET'])
def confirm_email():
    email = request.args.get('email')
    token = request.args.get('token')
    user =  verify_reset_token(token)
    if not user:
        return jsonify({'message': 'Invalid token'}), 400
    user.confirmed = True
    storage.save()
    return jsonify({'message': 'Email confirmed successfully'}), 200

@app_views.route("/users/<user_id>", strict_slashes=False)
def get_user(user_id):
    """
    Returns the User with id `user_id`
    """
    user = storage.get(User, id=user_id)
    if not user:
        abort(404)
    user = user.to_dict()
    return jsonify(user)


@app_views.route("/users/<user_id>", methods=["PUT"], strict_slashes=False)
def update_user(user_id):
    """
    Updates information of User with id `user_id`
    """
    user = storage.get(User, id=user_id)
    if not user:
        abort(404)
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    content = request.get_json()
    for key, value in content.items():
        if key not in ["id", "created_at", "updated_at", "email"]:
            setattr(user, key, value)
    storage.save()
    return jsonify(user.to_dict()), 200


@app_views.route("/users/<user_id>", methods=["DELETE"], strict_slashes=False)
def delete_user(user_id):
    """
    Deletes the User with id `user_id`
    """
    user = storage.get(User, id=user_id)
    if not user:
        abort(404)
    storage.delete(user)
    storage.save()
    return jsonify({}), 200
