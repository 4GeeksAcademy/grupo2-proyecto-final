"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Favorites, Genre, Recommendations, UserPlaylist
from api.utils import generate_sitemap, APIException
from api.security import generate_password_hash, check_password_hash
from sqlalchemy import func

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
        raise APIException("You must send the email in the body", status_code=422)
    if "password" not in body:
        raise APIException("You must send the password in the body", status_code=422)
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
        raise APIException("You must send the email address", status_code=422)
    if "password" not in body:
        raise APIException("You must send the password", status_code=422)
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

# Gets the list of users
@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    if users is None:
        raise APIException(f"There's no user in the database", status_code=400)
    users_serialized = list(map(lambda x : x.serialize(), users))
    print(users_serialized)
    response_body = ({'msg': 'Completed', 'users': users_serialized})
    return jsonify(response_body), 200

# Gets the information of a single user
@api.route('/user/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    single_user = User.query.get(user_id)
    if single_user is None:
        raise APIException(f"The user id {user_id} doesn't exist", status_code=400)
    print(single_user.serialize())
    response_body = {
        'user_id': user_id,
        'user_info': single_user.serialize()
    }
    return jsonify(response_body), 200

# Gets the list of movies
@api.route('/movie', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    movies_serialized = list(map(lambda x: x.serialize(), movies))
    return jsonify({'msg': 'Completed', 'movies': movies_serialized}), 200

# Gets the information of a single movie
@api.route('/movie/<int:movie_id>', methods=['GET'])
def get_single_movie(movie_id):
    single_movie = Movie.query.get(movie_id)
    if single_movie is None:
        raise APIException(f"The movie with id {movie_id} doesn't exist", status_code=400)
    print(single_movie.serialize())
    response_body = {
        'movie_id': movie_id,
        'movie_info': single_movie.serialize()
    }
    return jsonify(response_body), 200

#Checks current user's favorites
@api.route('/user/favorites/<int:user_id>', methods=['GET'])
def get_user_favorites(user_id):
    user_favorites = Favorites.query.filter_by(user_id=user_id).all()
    if not user_favorites:
        raise APIException(f"User with id {user_id} has no favorites", status_code=400)

    favorites_info = []
    for favorite in user_favorites:
        movie = Movie.query.get(favorite.id)
        genre = Genre.query.get(favorite.id)
        if movie:
            favorite_info = {
                'id': favorite.id,
                'title': movie.title,
                'genre': genre.name,
                'poster_path': movie.poster_path,
            }
            favorites_info.append(favorite_info)

    response_body = {
        'msg': 'Completed',
        'favorites': favorites_info
    }
    return jsonify(response_body), 200

# Adds a favorite movie to the user's favorite's list
@api.route('/favorite/<int:movie_id>', methods=['POST'])
def add_favorite_movie(movie_id):
    body = request.get_json(silent=True)
    if body is None:
        raise APIException('You must send information inside the body', status_code=400)
    if 'user_id' not in body:
        raise APIException('You must send the user id', status_code=400)
    user_id = body['user_id']
    # Checks if it was already favorited by the user
    existing_favorite = Favorites.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if existing_favorite:
        return jsonify({'message': 'This movie has already been favorited by the user'}), 409
    #Adds favorite to the list
    favorite = Favorites(user_id=user_id, movie_id=movie_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite movie added successfully'}), 201

# Removes a movie from the favorite movies' list
@api.route('/favorite/<int:movie_id>', methods=['DELETE'])
def delete_favorite_movie(movie_id):
    favorite_movie = Favorites.query.filter_by(movie_id=movie_id).first()
    if favorite_movie is None:
        raise APIException("The movie you are trying to remove doesn't exist", status_code=400)
    db.session.delete(favorite_movie)
    db.session.commit()
    return jsonify({'msg': 'Favorite movie removed successfully'}), 200

#Checks current user's recommended movies
@api.route('/recommended/<int:user_id>', methods=['GET'])
def get_user_recommended_movies(user_id):
    user_recommendations = Recommendations.query.filter_by(user_id=user_id).all()
    if not user_recommendations:
        raise APIException(f"No recommended movies have been issued yet for user with id {user_id}", status_code=400)
    
    recommended_movies_info = []
    for recommended in user_recommendations:
        movie = Movie.query.get(recommended.id)
        genre = Genre.query.get(recommended.id)
        if movie:
            movie_info = {
                'id': recommended.id,
                'title': movie.title,
                'synopsis': movie.overview,
                'genre': genre.name,
                'rating': movie.vote_average,
                'poster_path': movie.poster_path,
            }
            recommended_movies_info.append(movie_info)

    response_body = {
        'msg': 'Completed',
        'recommended_movies': recommended_movies_info
    }
    return jsonify(response_body), 200

# Get a recommended movie
@api.route('/recommended', methods=['POST'])
def get_movie_recommendation():
    body = request.get_json(silent=True)
    if body is None:
        raise APIException('You must send information inside the body', status_code=400)
    if 'user_id' not in body:
        raise APIException('You must send the user id', status_code=400)
    if 'genre' not in body:
        raise APIException('You must send the movie genre', status_code=400)
    if 'available_time' not in body:
        raise APIException('You must send the available time in minutes', status_code=400)

    user_id = body['user_id']
    genre = body['genre']
    available_time = body['available_time']

    # Filter movies by genre
    movies_by_genre = Movie.query.filter(Movie.genres.any(func.lower(Genre.name) == genre.lower())).all()

    # Filter movies based on available_time_minutes
    filtered_recommended_movies = [movie for movie in movies_by_genre if movie.runtime <= available_time]

    if not filtered_recommended_movies:
        return jsonify({'message': 'No movies were found for the specified criteria'}), 404

    # Checks the amount of existing recommendations for the user
    existing_recommendations_count = Recommendations.query.filter_by(user_id=user_id).count()

    # Checks if the user has already received the maximum number of recommendations
    MAX_RECOMMENDATIONS = 8
    if existing_recommendations_count >= MAX_RECOMMENDATIONS:
        return jsonify({'message': f'You have already received the maximum of {MAX_RECOMMENDATIONS} movie recommendations'}), 409

    # Making the recommendation random
    import random
    random_recommended_movie = random.choice(filtered_recommended_movies)

    # Checks if it was already recommended to the user
    existing_recommendation = Recommendations.query.filter_by(user_id=user_id, movie_id=random_recommended_movie.id).first()
    if existing_recommendation:
        return jsonify({'message': 'This movie has already been recommended to the user'}), 409

    # Adding to the Recommendations table
    new_recommendation = Recommendations(user_id=user_id, movie_id=random_recommended_movie.id)
    db.session.add(new_recommendation)
    db.session.commit()

    recommended_movie_serialized = random_recommended_movie.serialize()
    response_body = {'msg': 'Completed', 'recommended_movie': recommended_movie_serialized}
    return jsonify(response_body), 200

# Removes a movie from the recommended movies' list
@api.route('/recommended/<int:movie_id>', methods=['DELETE'])
def delete_recommended_movie(movie_id):
    recommended_movie = Recommendations.query.filter_by(movie_id=movie_id).first()
    if recommended_movie is None:
        raise APIException("The movie you are trying to remove doesn't exist", status_code=400)
    db.session.delete(recommended_movie)
    db.session.commit()
    return jsonify({'msg': 'Recommended movie removed successfully'}), 200

#Checks user's playlist
@api.route('user/playlist/<int:user_id>', methods=['GET'])
def get_user_playlist(user_id):
    user_playlist = UserPlaylist.query.filter_by(user_id=user_id).all()
    if not user_playlist:
        raise APIException(f"User with id {user_id} has no movies in the playlist", status_code=400)
    playlist_info = []
    for movie_in_playlist in user_playlist:
        movie = Movie.query.get(movie_in_playlist.id)
        genre = Genre.query.get(movie_in_playlist.id)
        if movie:
            movie_info = {
                'id': movie_in_playlist.id,
                'title': movie.title,
                'synopsis': movie.overview,
                'rating': movie.vote_average,
                'genre': genre.name,
                'poster_path': movie.poster_path,
            }
            playlist_info.append(movie_info)

    response_body = {
        'msg': 'Completed',
        'playlist': playlist_info
    }
    return jsonify(response_body), 200

# Adds a movie to the user's playlist
@api.route('/playlist/<int:movie_id>', methods=['POST'])
def add_movie_to_playlist(movie_id):
    body = request.get_json(silent=True)
    if body is None:
        raise APIException('You must send information inside the body', status_code=400)
    if 'user_id' not in body:
        raise APIException('You must send the user id', status_code=400)
    user_id = body['user_id']
    # Checks if it was already added by the user
    existing_playlist = UserPlaylist.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if existing_playlist:
        return jsonify({'message': 'This movie has already been added by the user'}), 409
    #Adds movie to the playlist
    movie_added_to_playlist = UserPlaylist(user_id=user_id, movie_id=movie_id)
    db.session.add(movie_added_to_playlist)
    db.session.commit()
    return jsonify({'message': 'A movie was added successfully to the playlist'}), 201

# Removes a movie from the favorite movies' list
@api.route('/playlist/<int:movie_id>', methods=['DELETE'])
def delete_movie_from_playlist(movie_id):
    playlist_movie = UserPlaylist.query.filter_by(movie_id=movie_id).first()
    if playlist_movie is None:
        raise APIException("The movie you are trying to remove doesn't exist", status_code=400)
    db.session.delete(playlist_movie)
    db.session.commit()
    return jsonify({'msg': 'A movie was removed from the playlist successfully'}), 200
