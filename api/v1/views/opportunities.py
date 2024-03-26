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
