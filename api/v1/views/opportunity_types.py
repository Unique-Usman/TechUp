#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the Opportunity_type object
"""
from api.v1.views import app_views
from models.opportunity_type import Opportunity_type
from flask import abort, jsonify, request
from models import storage
from flask_jwt_extended import jwt_required


@app_views.route("/opportunity_types", strict_slashes=False)
def get_opportunity_types():
    """
    Retrieves all the Opportunity type objects from the database and
    returns a list containing them
    """
    all_opportunity_types = storage.all(Opportunity_type)
    all_types_list = []
    for opp_type in all_opportunity_types.values():
        all_types_list.append(opp_type.to_dict())
    return jsonify(all_types_list)


@app_views.route("/opportunity_types/<type_id>", strict_slashes=False)
def get_opportunity_type(type_id):
    """
    Returns the Opportunity type with id `type_id`
    """
    opportunity_type = storage.get(Opportunity_type, id=type_id)
    if not opportunity_type:
        abort(404)
    opportunity_type = opportunity_type.to_dict()
    return jsonify(opportunity_type)


@app_views.route("/opportunity_type/<type_id>/users", strict_slashes=False)
@jwt_required()
def get_all_subscribers_of_an_opportunity_type(type_id):
    """
    Returns all subscribers/users of an opportunity type
    """
    subscriptions = storage.get(subscriptions, opportunity_type_id=type_id)
    users_list = []
    for user in subscriptions:
        users_list.append(user.user_id)
    return jsonify(users_list)


@app_views.route("/opportunity_types", methods=["POST"], strict_slashes=False)
def create_opportunity_type():
    """
    Creates a new opportunity type
    """
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    content = request.get_json()
    if "name" not in content:
        return jsonify({"message": "Missing name"}), 400

    opportunity_type = Opportunity_type()
    for key, value in content.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(opportunity_type, key, value)
    storage.new(opportunity_type)
    storage.save()
    return jsonify(opportunity_type.to_dict()), 201
