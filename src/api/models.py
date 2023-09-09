from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    reset_token = db.Column(db.String(100))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "user_id": self.id,
            "email": self.email,
        }

class WatchLater(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User)
    movie_id = db.Column(db.Integer, nullable=False) 
    title = db.Column(db.String(250), nullable=False)
    overview = db.Column(db.Text)
    release_date = db.Column(db.String(20))
    runtime = db.Column(db.Integer)
    vote_average = db.Column(db.Float)
    original_language = db.Column(db.String(10))
    poster_path = db.Column(db.String(250))

    def __repr__(self):
        return f"WatchLater_Movie: {self.title} with id {self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "title": self.title,
            "overview": self.overview,
            "release_date": self.release_date,
            "runtime": self.runtime,
            "vote_average": self.vote_average,
            "original_language": self.original_language,
            "poster_path": self.poster_path,
        }
    