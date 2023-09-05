import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import PropTypes from 'prop-types';

const Card = ({ movie, user_id }) => {
    const { store, actions } = useContext(Context);

    const handleAddToWatchLater = async () => {
        console.log('user_id:', user_id);
        actions.addToWatchLater({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            original_language: movie.original_language,
            runtime: movie.runtime || 0,
            vote_average: movie.vote_average,
        });
    };

    return (
        <div className="card movies-card">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="img-fluid" alt={movie.title} />
                <Link to={`/movie/${movie.id}`} />
            </div>
            <div className="card-footer movies-footer">
                <div className="movies-footer-title">
                    {movie.title}
                </div>
                <div className="movies-footer-buttons">
                    <button type="button" className="btn btn-danger"
                        onClick={handleAddToWatchLater}>
                        <i className="fas fa-eye"></i>
                    </button>
                    <Link to={`/movie/${movie.id}`} >
                        <button type="button" className="btn btn-warning movies-info-btn">
                            <i className="text-light fas fa-circle-exclamation"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

Card.propTypes = {
    movie: PropTypes.object.isRequired,
    user_id: PropTypes.number,
};

export default Card;