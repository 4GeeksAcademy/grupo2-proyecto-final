import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Card from '../component/Card';

function Playlist() {
    const { store, actions } = useContext(Context);
    const watchlistMovies = store.watchLaterList;

    useEffect(() => {
        // Fetch watchlist movies when the component mounts
        actions.fetchWatchLaterMovies();
    }, []);

    return (
        <div className="movies-container">
            <h2 className="text-light">Watch Later</h2>
            <div className="text-center d-flex overflow-auto pt-3 movies-card-container">
                {watchlistMovies.length === 0 ? (
                    <div className="no-movies-text">
                        No movies added
                    </div>
                ) : (
                    watchlistMovies.map(movie => (
                        <Card
                            key={movie.id}
                            movie={movie}
                            user_id={store.user_id}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Playlist;

