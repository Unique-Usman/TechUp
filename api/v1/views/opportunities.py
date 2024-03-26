#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the Opportunity object
"""
from api.v1.views import app_views
from models.user import Opportunity
from flask import abort, jsonify, request
from models import storage


@app_views.route("/opportunities", strict_slashes=False)
def get_opportunities():
    """
    Retrieves all the Opportunity objects from the database and
    returns a list containing them
    """
    all_opportunities = storage.all(Opportunity)
    all_opportunities_list = []
    for opportunity in all_opportunities.values():
        all_opportunites_list.append(opportunity.to_dict())
    return jsonify(all_opportunities_list)


@app_views.route("/opportunities", strict_slashes=False)
def create_opportunity():
    """
    Creates a new opportunity
    """
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    content = request.get_json()
    if "title" not in content:
        return jsonify({"message": "Missing title"}), 400
    if "link" not in content:
        return jsonify({"message": "Missing opportunity link"}), 400
    if "deadline" not in content:
        return jsonify({"message": "Missing deadline"}), 400
    if "description" not in content:
        return jsonify({"message": "Missing description"}), 400
    if "opportunity_type_id" not in content:
        return jsonify({"message": "Missing opportunity type"}), 400

    opportunity = Opportunity()
    for key, value in content.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(opportunity, key, value)
    storage.new(opportunity)
    storage.save()
    return jsonify(opportunity.to_dict())


@app_views.route("/opportunities/<opportunity_id>", strict_slashes=False)
def get_opportunity(opportunity_id):
    """
    Returns the Opportunity with id `opportunity_id`
    """
    opportunity = storage.get(Opportunity, opportunity_id)
    if not opportunity:
        abort(404)
    opportunity = opportunity.to_dict()
    return jsonify(opportunity)


@app_views.route("/opportunities/<opportunity_id>",
                 methods=["PUT"],
                 strict_slashes=False)
def update_opportunity(opportunity_id):
    """
    Updates an Opportunity object
    """
    opportunity = storage.get(Opportunity, opportunity_id)
    if not opportunity:
        abort(404)
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    content = request.get_json()
    for key, value in content.items():
        if key not in ["id", "created_at", "updated_at", "user_id"]:
            setattr(opportunity, key, value)
    storage.save()
    return jsonify(opportunity.to_dict()), 200


@app_views.route("/opportunities/<opportunity_id>",
                 methods=["DELETE"],
                 strict_slashes=False)
def delete_opportunity(opportunity_id):
    """
    Deletes the Opportunity with id `opportunity_id`
    """
    opportunity = opportunity.get(Opportunity, opportunity_id)
    if not opportunity:
        abort(404)
    storage.delete(opportunity)
    storage.save()
    return jsonify({}), 200


@app_views.route("/user/<user_id>/opportunities", strict_slashes=False)
def get_all_opportunities_of_user(user_id):
    """
    Returns all the opportunities of a user with id `user_id`
    """
    opportunities = storage.__session.query(Opportunity).filter_by(
                    user_id=user_id).all()
    user_opportunities = []
    for opportunity in opportunites:
        user_opportunities.append(opportunity.to_dict())
    return jsonify(user_opportunities)
