#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the Opportunity_type object
"""
from api.v1.views import app_views
from models.opportunities import Opportunity_type
from flask import abort, jsonify, request
from models import storage


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
