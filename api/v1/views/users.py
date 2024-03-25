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


@app_views.route("/users/<user_id>", strict_slashes=False)
def get_user(user_id):
    """
    Returns the User with id `user_id`
    """
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    user = user.to_dict()
    return jsonify(user)


@app_views.route("/users/<user_id>", methods=["PUT"], strict_slashes=False)
def update_user(user_id):
    """
    Updates information of User with id `user_id`
    """
    user = storage.get(User, user_id)
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
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    storage.delete(user)
    storage.save()
    return jsonify({}), 200
