#!/usr/bin/python3
"""
Handles all the default RESTful API actions of the User object
"""
from api.v1.views import app_views
from models.user import User
from flask import abort, jsonify, request, make_response
import validators
import datetime
from models import storage
from werkzeug.security import check_password_hash, generate_password_hash
from api.v1.views.utils import (
    send_confirm_email,
    get_token,
    verify_reset_token
)
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    decode_token
)


@app_views.route("/users", strict_slashes=False)
@jwt_required()
def get_users():
    """
    Retrieves all the User objects from the database and
    returns a list containing them
    """
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    total_users = len(storage.all(User))
    total_pages = (total_users - 1) // per_page + 1
    has_previous = page > 1
    has_next = page < total_pages
    paginated_users = storage.paginate(User, page, per_page)
    all_users_list = []
    for user in paginated_users:
        all_users_list.append(user.to_dict())
    return jsonify({
        'results': all_users_list,
        'has_previous': has_previous,
        'has_next': has_next,
        'page': page,
        'per_page': per_page,
        'total_users': total_users,
        'total_pages': total_pages
        })


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
    if "username" not in content:
        return jsonify({"message": "Missing username"}), 400

    email = content.get("email")
    username = content.get("username")
    existing_email = storage.get(User, email=email)
    existing_username = storage.get(User, username=username)

    if len(existing_email) > 0:
        existing_email = existing_email[0]

    if len(existing_username) > 0:
        existing_username = existing_username[0]

    if existing_email:
        return jsonify({
            'error': "A user with this email address already exists"}
            ), 400

    if existing_username:
        return jsonify({
            'error': "A user with this username already exists"}
            ), 400

    if not validators.email(email):
        return jsonify({'error': "Email is not valid"}), 400

    if "github" not in content:
        return jsonify({"message": "Missing Github link"}), 400
    print(email)
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
    user = verify_reset_token(token)
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


@app_views.route("/users/me", strict_slashes=False)
@jwt_required()
def get_current_user_info():
    """
    Returns the User info of current authenticated user
    """
    user_id = get_jwt_identity()
    current_user = storage.get(User, id=user_id)
    if not current_user:
        abort(404)
    current_user = current_user.to_dict()
    return jsonify(current_user)


@app_views.route("/users/username/<username>", strict_slashes=False)
def get_user_with_username(username):
    """
    Returns the User with username `username`
    """
    user = storage.get(User, username=username)
    if not user:
        abort(404)
    user = user[0]
    user = user.to_dict()
    return jsonify(user)


@app_views.route("/users/<user_id>", methods=["PUT"], strict_slashes=False)
@jwt_required()
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
@jwt_required()
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


@app_views.route('/login', strict_slashes=False, methods=["POST"])
def login():
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return jsonify({"message": "Not a JSON"}), 400
    content = request.get_json()
    if "password" not in content:
        return jsonify({"message": "Missing password"}), 400
    if "email" not in content:
        return jsonify({"message": "Missing email"}), 400

    email = content.get("email")
    password = content.get("password")
    user = storage.get(User, email=email)[0]
    if user.confirmed is False:
        token = get_token(email)
        send_confirm_email(email, token)
        return jsonify({
            "message": ("Your email has not been verified. "
                        "Kindly, check your mail to do so")
            }), 403

    if user:
        is_pass_correct = check_password_hash(user.password, password)
        if is_pass_correct:
            refresh = create_refresh_token(identity=user.id)
            access = create_access_token(identity=user.id,
                                         fresh=datetime.timedelta(minutes=60))
            # we might need to add this to the database but, for now, we can use this placeholder.
            roles = [2001]
            if user.first_name == "Usman" or user.first_name == "Henshaw":
                roles.append(5150)
            resp = make_response(jsonify({
                'user': {
                    'access': access,
                    'username': user.username,
                    'email': user.email,
                    "roles": roles
                }
            }), 200)
            resp.set_cookie('refresh_token', refresh, httponly=True, samesite='None', secure=True)
            return resp

    return jsonify({'error': 'Wrong credentials'}), 401


@app_views.route('/token/refresh', strict_slashes=False)
def refresh_users_token():
    session_token = request.cookies.get('refresh_token')
    if not session_token:
        return jsonify({'message': 'Missing refresh token'}), 401
    try:
        token_data = decode_token(session_token)
        identity = token_data['sub']  # 'sub' is the key for the identity in the token
    except Exception as e:
        return jsonify({'message': 'Invalid refresh token'}), 401
    
    user = storage.get(User, id=identity)
    # we might need to add this to the database but, for now, we can use this placeholder.
    roles = [2001]
    if user.first_name == "Usman" or user.first_name == "Henshaw":
        roles.append(5150)
    access = create_access_token(identity=identity, fresh=datetime.timedelta(minutes=60))

    return jsonify({'access': access, 'roles': roles}), 200


@app_views.route('/logout', strict_slashes=False)
def logout():
    # Clear the refresh token cookie on the client side
    session_token = request.cookies.get('refresh_token')
    if session_token is None:
        return jsonify({'message': 'No refresh token found'}), 400

    response = make_response(jsonify({'message': 'Logged out successfully'}), 200)
    response.set_cookie('refresh_token', '', httponly=True, samesite='None', secure=True, path="/", expires=0)
    return response
