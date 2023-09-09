import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import PropTypes from 'prop-types';

const Card = ({ movie, user_id, onRemoveFromWatchLater }) => {
    const { store, actions } = useContext(Context);
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(location.pathname);

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
    
    const handleRemoveFromWatchLater = () => {
        onRemoveFromWatchLater(movie.id);
    };

    const showWatchLaterIcon = () => {
        if (currentPage.includes('/movie')) {
            return (
                <button type="button" className="btn btn-danger" onClick={handleAddToWatchLater}>
                    <i className="fas fa-eye"></i>
                </button>
            );
        } else if (currentPage.includes('/playlist')) {
            return (
                <button type="button" className="btn btn-light" onClick={handleRemoveFromWatchLater}>
                    <i className="fas fa-trash"></i>
                </button>
            );
        } else {
            return null;
        }
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
                    {showWatchLaterIcon()}
                    <Link to={`/movie/${movie.id}`} >
                        <button type="button" className="btn btn-warning movies-info-btn">
                            <i className="text-light fas fa-circle-exclamation"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    movie: PropTypes.object.isRequired,
    user_id: PropTypes.number.isRequired,
};

export default Card;
