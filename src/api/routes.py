"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WatchLater
from api.utils import generate_sitemap, APIException
from api.security import generate_password_hash, check_password_hash
from sqlalchemy import func

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json(silent=True)
    if body is None:
        raise APIException(
            "You must send information in the body", status_code=400)
    if "email" not in body:
        raise APIException(
            "You must send the email in the body", status_code=422)
    if "password" not in body:
        raise APIException(
            "You must send the password in the body", status_code=422)
    # Check if the password matches
    if body["password"] != body["confirm_password"]:
        raise APIException("Passwords don't match", status_code=400)
    
    pw_hash = generate_password_hash(body["password"]).decode("utf-8")
    new_user = User(email=body["email"], password=pw_hash, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(User_Created=body["email"]), 200


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        raise APIException(
            "You must send information in the body", status_code=400)
    if "email" not in body:
        raise APIException("You must send the email address", status_code=422)
    if "password" not in body:
        raise APIException("You must send the password", status_code=422)
    user_data = User.query.filter_by(email=body["email"]).first()
    if user_data is None:
        raise APIException("Bad username or password", status_code=400)
    if check_password_hash(user_data.password, body["password"]) is False:
        raise APIException("Bad username or password", status_code=400)
    response_data = {
        "access_token": create_access_token(identity=body["email"]),
        "user_id": user_data.id
    }
    return jsonify(response_data), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    logged_user = get_jwt_identity()
    return jsonify({"User": logged_user}), 200

# Gets the list of users
@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    if users is None:
        raise APIException(f"There's no user in the database", status_code=400)
    users_serialized = list(map(lambda x: x.serialize(), users))
    print(users_serialized)
    response_body = ({'msg': 'Completed', 'users': users_serialized})
    return jsonify(response_body), 200

# Gets the information of a single user
@api.route('/user/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    single_user = User.query.get(user_id)
    if single_user is None:
        raise APIException(
            f"The user id {user_id} doesn't exist", status_code=400)
    print(single_user.serialize())
    response_body = {
        'user_id': user_id,
        'user_info': single_user.serialize()
    }
    return jsonify(response_body), 200

# Updates user's password
@api.route('/updatepassword', methods=['PUT'])
@jwt_required()
def update_password():
    user_email = get_jwt_identity()
    body = request.get_json(silent=True)
    if body is None:
        raise APIException(
            "You must send information in the body", status_code=400)

    if "current_password" not in body or not body["current_password"]:
        raise APIException("Current password is required", status_code=422)

    if "new_password" not in body or not body["new_password"]:
        raise APIException("New password is required", status_code=422)

    user = User.query.filter_by(email=user_email).first()
    if user is None:
        raise APIException("User not found", status_code=404)

    # Check if the current password matches
    if not check_password_hash(user.password, body["current_password"]):
        raise APIException("Current password is incorrect", status_code=400)

    # Update the user's password with the new one
    user.password = generate_password_hash(
        body["new_password"]).decode("utf-8")
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200

# Gets the list of movies added to all Watch Later lists
@api.route('/movie', methods=['GET'])
def get_movies():
    movies = WatchLater.query.all()
    movies_serialized = list(map(lambda x: x.serialize(), movies))
    return jsonify({'msg': 'Completed', 'movies': movies_serialized}), 200

# Checks current user's Watch Later list
@api.route('/user/playlist/<int:user_id>', methods=['GET'])
def get_user_watch_later(user_id):
    user_watch_later = WatchLater.query.filter_by(user_id=user_id).all()
    if not user_watch_later:
        raise APIException(
            f"User with id {user_id} has no movies in Watch Later", status_code=400)

    watchlater_list_info = []
    for movie in user_watch_later:
        movie = WatchLater.query.get(movie.id)
        if movie:
            movie_info = {
                'id': movie.id,
                'title': movie.title,
                'overview': movie.overview,
                'runtime': movie.runtime,
                'rating': movie.vote_average,
                'poster_path': movie.poster_path,
            }
            watchlater_list_info.append(movie_info)

    response_body = {
        'msg': 'Completed',
        'results': watchlater_list_info
    }
    return jsonify(response_body), 200

# Adds a movie to the user's watchlist
@api.route('/playlist/<int:movie_id>', methods=['POST'])
def add_to_watchlater(movie_id):
    body = request.get_json(silent=True)
    if body is None:
        raise APIException(
            'You must send information inside the body', status_code=400)
    if 'user_id' not in body:
        raise APIException('You must send the user id', status_code=400)

    user_id = body['user_id']
    movie_data = body['movie_data']

    print("user_id:", user_id)
    print("movie_data:", movie_data)

    # Checks if it was already added to the Watch Later list by the user
    existing_movie = WatchLater.query.filter_by(
        user_id=user_id, movie_id=movie_data['id']).first()
    if existing_movie:
        raise APIException('This movie has already been added', status_code=409)

    # Creates a new Watch Later record
    new_movie = WatchLater(
        user_id=user_id,
        movie_id=movie_data['id'],
        title=movie_data['title'],
        overview=movie_data['overview'],
        poster_path=movie_data['poster_path'],
        release_date=movie_data['release_date'],
        original_language=movie_data['original_language'],
        runtime=movie_data['runtime'],
        vote_average=movie_data['vote_average']
    )

    # Adds the new movie to the Watch Later list
    db.session.add(new_movie)
    db.session.commit()

    return jsonify({'message': 'Movie was added to the Watch Later list successfully'}), 201

# Removes a movie from the user's Watch Later list
@api.route('/playlist/<int:movie_id>', methods=['DELETE'])
def delet_from_watchlater(movie_id):
    watchlater_movie = WatchLater.query.filter_by(movie_id=movie_id).first()
    if watchlater_movie is None:
        raise APIException(
            "The movie you are trying to remove doesn't exist", status_code=400)
    db.session.delete(watchlater_movie)
    db.session.commit()
    return jsonify({'msg': 'A movie was removed successfully'}), 200
