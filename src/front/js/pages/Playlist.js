import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import Card from '../component/Card';

function Playlist() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);

    const handleRemoveFromWatchLater = (movieId) => {
        // Filtra las películas para excluir la que se va a eliminar
        const updatedWatchLaterList = watchLaterMovies.filter(
            (movie) => movie.id !== movieId
        );

        // Actualiza el estado local con la nueva lista
        setWatchLaterMovies(updatedWatchLaterList);
    };

    useEffect(() => {
        const fetchWatchLaterMovies = async () => {
            try {
                const response = await fetch(`/api/user/playlist/${store.user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setWatchLaterMovies(data.results);
                } else {
                    console.error('Error fetching Watch Later movies');
                }
            } catch (error) {
                console.error('Error fetching Watch Later movies', error);
            }
        };

        fetchWatchLaterMovies();
    }, [store.user_id]);

    return (
        <div className="movies-container">
            <h2 className="text-light">Watch Later</h2>
            <div className="text-center d-flex overflow-auto pt-3 movies-card-container">
                {watchLaterMovies.length === 0 ? (
                    <div className="no-movies-text">
                        No movie added
                    </div>
                ) : (
                    watchLaterMovies.map(movie => (
                        <Card
                            key={movie.id}
                            movie={movie}
                            user_id={store.user_id}
                            onRemoveFromWatchLater={handleRemoveFromWatchLater}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Playlist;

