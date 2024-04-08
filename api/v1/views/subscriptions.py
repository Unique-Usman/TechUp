#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the Opportunity object
"""
from api.v1.views import app_views
from models.user import subscriptions
from flask import abort, jsonify, request
from models import storage


@app_views.route("/subscriptions", strict_slashes=False)
def get_subscriptions():
    """
    Retrieves all subscriptions from the database and
    returns a list containing them
    """
    all_subscriptions = storage.all(subscriptions)
    all_subscriptions_list = []
    for subscription in all_subscriptions.values():
        all_subscriptions_list.append(subscription.to_dict())
    return jsonify(all_subscriptions_list)


@app_views.route("/subscriptions/<user_id>/<opp_type_id>",
                 methods=["POST"], strict_slashes=False)
def create_subscriptions(user_id, opp_type_id):
    """
    Creates a new subscription
    """
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    data = {'user_id': user_id, 'opportunity_type_id': opp_type_id}
    subscription = storage.execute(subscriptions, data)
    storage.save()
    return jsonify({"message": "Subscribed successfully"})
