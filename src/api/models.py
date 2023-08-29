from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "user_id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    movie = db.relationship('Movie', back_populates='genres')

    def __repr__(self):
        return f"Genre: {self.name} with id {self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    iso_639_1 = db.Column(db.String(4), nullable=False)
    english_name = db.Column(db.String(50), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    movie = db.relationship('Movie', back_populates='spoken_languages')

    def __repr__(self):
        return f"Language: {self.english_name} with id {self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "iso_639_1": self.iso_639_1,
            "english_name": self.english_name,
        }

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    overview = db.Column(db.Text)
    release_date = db.Column(db.String(20))
    runtime = db.Column(db.Integer)
    vote_average = db.Column(db.Float)
    original_language = db.Column(db.String(10))
    poster_path = db.Column(db.String(250))
    genres = db.relationship('Genre', back_populates='movie')
    spoken_languages = db.relationship('Language', back_populates='movie')

    def __repr__(self):
        return f"Movie: {self.title} with id {self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "overview": self.overview,
            "release_date": self.release_date,
            "runtime": self.runtime,
            "vote_average": self.vote_average,
            "original_language": self.original_language,
            "poster_path": self.poster_path,
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User)
    movie_id = db.Column(db.Integer, nullable=False)
    # movie_id = db.Column(db.Integer, db.ForeignKey(Movie.id), nullable=False)
    # movie = db.relationship(Movie)

    def __repr__(self):
        return f"Favorite: {self.id} for User: {self.user_id}"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
        }

class Recommendations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User)
    movie_id = db.Column(db.Integer, db.ForeignKey(Movie.id), nullable=False)
    movie = db.relationship(Movie)

    def __repr__(self):
        return f"Recommended_Movies: {self.id} for User: {self.user_id}"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
        }

class UserPlaylist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User)
    movie_id = db.Column(db.Integer, db.ForeignKey(Movie.id), nullable=False)
    movie = db.relationship(Movie)

    def __repr__(self):
        return f"User_Playlist: {self.id} for User: {self.user_id}"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
        }

    