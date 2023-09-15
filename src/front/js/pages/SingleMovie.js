import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import ComingSoonPlaceholder from '../../img/coming-soon-detail-view.png'
import "../../styles/MovieView.css";
import SimilarCard from '../component/SimilarCard';

const SingleMovie = ({ user_id }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState("");
    const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
    const selectedMovieWatchProvider = store.selectedMovie?.['watch/providers']?.results?.CR?.flatrate;
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
    const params = useParams();
    const token = localStorage.getItem("token");

    const handleAddToWatchLater = async () => {
        console.log('user_id:', user_id);
        actions.addToWatchLater({
            id: store.selectedMovie.id,
            title: store.selectedMovie.title,
            overview: store.selectedMovie.overview,
            poster_path: store.selectedMovie.poster_path,
            release_date: store.selectedMovie.release_date,
            original_language: store.selectedMovie.original_language,
            runtime: store.selectedMovie.runtime || 0,
            vote_average: store.selectedMovie.vote_average,
        });
    };

    useEffect(() => {
        // Redirect to restricted page if not logged in
        if (!token) {
            navigate("/restricted-access");
            return;
        };
        // Fetch Movie information
        actions.fetchMovie(params);
    }, []);

    useEffect(() => {
        // Fetch Trailer video
        actions.fetchVideos(params, setYoutubeEmbedUrl);
        // Fetch Watch Providers
        actions.fetchProvider(params);
        //Fetch Similar Movies
        actions.fetchSimilar(params);
    }, [params.theid]);

    // Fetch API images
    useEffect(() => {
        const fetchMovieImg = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}&append_to_response=images`
                )
                if (response.ok) {
                    const data = await response.json()
                    setSelectedMovie(previousData => ({
                        ...previousData,
                        images: data,
                    }))
                } else {
                    console.error("Error fetching movie image")
                }
            } catch (error) {
                console.error("Error fetching movie data", error)
            }
        }
        fetchMovieImg();
    }, [params.theid])

    if (!store.selectedMovie) {
        return <p>Oops...</p>;
    }

    return (
        <>
            <div className='SingleMovie'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 4, 25, 0.5), rgba(0, 0, 0, 0.938)), 
                    url(${store.selectedMovie.backdrop_path ? `${BACKDROP_PATH}/${store.selectedMovie.backdrop_path}` : (ComingSoonPlaceholder)})`,
                    backgroundRepeat: "no-repeat"
                }}>
                <div className='container'>
                    <section className="row">
                        <div className='YoutubePlayer text-center'>
                            <iframe width="900" height="500" src={youtubeEmbedUrl}
                                title="Movie Trailer"
                                allowFullScreen></iframe>
                        </div>
                        <div className='movieheader'></div>
                        <div className='col-lg-12 col-md-6 col-sm-12' >
                            <div className='headertext'>
                                <h1 className="text-white" >{store.selectedMovie.title} </h1>
                                <section className="row text-center mt-5">
                                    <div className="col-lg-3 col-sm-3 col-6 text-white">
                                        <h6>Release date: {store.selectedMovie.release_date}</h6>
                                    </div>
                                    <div className="col-lg-3 col-sm-3 col-6 text-white">
                                        <h6>Duration: {store.selectedMovie.runtime} min.</h6>
                                    </div>
                                    <div className="col-lg-3 col-sm-3 col-6">
                                        <h6>Rating: {store.selectedMovie.vote_average}</h6>
                                    </div>
                                    <div className="col-lg-3 col-sm-3 col-6">
                                        <h6>Original language: {store.selectedMovie.original_language}</h6>
                                    </div>
                                </section>
                                <p className=' mt-3 text-white'>{store.selectedMovie.overview}</p>
                            </div >
                            <div>
                                <span className="col-lg-2 col-md-6 col-sm-2 mt-3 text-white">
                                    {store.selectedMovie.genres ? (
                                        store.selectedMovie.genres.map((genre) => (
                                            <div className="genreSection col-lg-2 col-sm-2 col-6 text-white" style={{ display: "inline-block" }} key={genre.id}>
                                                <p>{genre.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No genres found</p>
                                    )}
                                </span>
                                <button type="button" className="btn btn-watch-later" data-toggle="tooltip"
                                    data-placement="top" title="Click to add to Watchlist" onClick={handleAddToWatchLater}>
                                    <i className="fas fa-eye"><span className='btn-text'>Add to Watchlist</span></i>
                                </button>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Watch Providers:</p>
                                {(selectedMovieWatchProvider) ? (
                                    selectedMovieWatchProvider.map((provider) => (
                                        <div key={provider.provider_id}>
                                            <p >{provider.provider_name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No providers found</p>
                                )}
                            </div>
                            <h2 className="text-white">You may also like:</h2>
                            {store.similarMovies && store.similarMovies.length > 0 ? (
                                <div className="text-center d-flex overflow-auto pt-3 movies-card-container">
                                    {store.similarMovies.map(movie => (
                                        <SimilarCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p className='text-white'>No similar movies found</p>
                                </div>
                            )}
                        </div>
                    </section >
                </div>
            </div>
        </>
    )
}
export default SingleMovie
