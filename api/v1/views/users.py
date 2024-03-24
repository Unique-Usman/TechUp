#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the User object
"""
from api.v1.views import app_views
from models.user import User
from flask import abort, jsonify, request
from models import storage


@app_views.route("/users", strict_slashes=False)
def users():
    """
    Retrieves all the User objects from the database and
    returns a list containing them
    """
    all_users = storage.all(User)
    all_users_list = []
    for user in all_users.values():
        all_users_list.append(user.to_dict())
    return jsonify(all_users_list)
