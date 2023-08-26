"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.security import generate_password_hash, check_password_hash

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json(silent=True)
    if body is None:
        raise APIException("You must send information in the body", status_code=400)
    if "email" not in body:
        raise APIException("You must send the email in the body", status_code=400)
    if "password" not in body:
        raise APIException("You must send the password in the body", status_code=400)
    pw_hash = generate_password_hash(body["password"]).decode("utf-8")
    new_user = User(email=body["email"], password=pw_hash, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(User_Created = body["email"]), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        raise APIException("You must send information in the body", status_code=400)
    if "email" not in body:
        raise APIException("You must send the email address", status_code=400)
    if "password" not in body:
        raise APIException("You must send the password", status_code=400)
    user_data = User.query.filter_by(email=body["email"]).first()
    if user_data is None:
        raise APIException("Bad username or password", status_code=400)
    if check_password_hash(user_data.password, body["password"]) is False:
        raise APIException("Bad username or password", status_code=400)
    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    logged_user = get_jwt_identity()
    return jsonify({"User": logged_user}), 200