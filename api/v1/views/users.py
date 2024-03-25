#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the User object
"""
from api.v1.views import app_views
from models.user import User
from flask import abort, jsonify, request
from models import storage


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


@app_views.route("/users", methods=["POST"], strict_slashes=False)
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
    if "github_link" not in content:
        return jsonify({"message": "Missing Github link"}), 400
    user = User()
    for key, value in content.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(user, key, value)
    storage.new(user)
    storage.save()
    return jsonify(user.to_dict()), 201
