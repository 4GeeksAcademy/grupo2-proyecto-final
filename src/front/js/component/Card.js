import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const Card = ({ movie }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="card movies-card">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt={movie.title} />
                <Link to={`/movies/${movie.id}`} />
            </div>
            <div className="card-footer movies-footer">
                <div className="movies-footer-title">
                    {movie.title}
                </div>
                <div className="movies-footer-buttons">
                    <button type="button" className="btn btn-danger"
                        onClick={() => { actions.addFavorites(movie) }}>
                        <i className="fas fa-heart"></i>
                    </button>
                    <Link to={`/movies/${movie.id}`} >
                        <button type="button" className="btn btn-warning movies-info-btn">
                            <i className="text-light fas fa-circle-exclamation"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Card;