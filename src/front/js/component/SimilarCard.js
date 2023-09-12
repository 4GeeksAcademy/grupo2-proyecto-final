import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const SimilarCard = ({ movie }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="cardSimilar">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className="img-fluid" alt={movie.title} />
                <Link to={`/movie/${movie.id}`} />
            </div>
            <div className="card-footer movies-footer">
                <div className="movies-footer-title">
                    {movie.title}
                </div>
            </div>
        </div>
    )
}

export default SimilarCard
