import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/SimilarCard.css'

const SimilarCard = ({ movie }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="cardSimilar">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className="img-fluid" alt={movie.title} />
                <div className="title-overlay">
                    {movie.title}
                </div>
                <Link to={`/movie/${movie.id}`} />
            </div>
        </div>
    )
}

export default SimilarCard
