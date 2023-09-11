import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/MovieView.css";
import Card from '../component/Card';

const SingleMovie = () => {
    const { store, actions } = useContext(Context);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedMovieSimilar, setselectedMovieSimilar] = useState([]);
    const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
    const params = useParams();

    // Fetch Movie information
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}`

                )
                if (response.ok) {
                    const data = await response.json();
                    setSelectedMovie(data);
                } else {
                    console.error("Error fetching movie data");
                }
            } catch (error) {
                console.error("Error fetching movie data", error);
            }
        }
        fetchMovie();
    }, [params.theid])

    //Fetch Watch Providers
    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}&append_to_response=watch/providers`
                )
                if (response.ok) {
                    const data = await response.json()
                    setSelectedMovie(data)
                } else {
                    console.error("Error fetching provider data")
                }
            } catch (error) {
                console.error("Error fetching movie data", error);
            }
        }
        fetchProvider();
    }, [])


    //Fetch Trailer video 

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoUrl = `https://api.themoviedb.org/3/movie/${params.theid}/videos?api_key=${API_key}&language=en-US`;
                const resp = await fetch(videoUrl)
                if (resp.ok) {
                    const data = await resp.json()
                    const trailer = data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
                    if (trailer) {
                        // Extract the trailer key
                        const trailerKey = trailer.key;
                        // Build the YouTube embed URL
                        setYoutubeEmbedUrl(`https://www.youtube.com/embed/${trailerKey}`);
                    }
                } else {
                    console.error("Error fetching provider data")
                }
            } catch (error) {
                console.error("Error fetching movie data", error);
            }
        }
        fetchVideos();
    }, [])

    //Fetch API images
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

    //Fetch Similar Movies

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}&append_to_response=similar`
                )
                if (response.ok) {
                    const data = await response.json()
                    setselectedMovieSimilar(data.results);
                } else {
                    console.error("Error fetching similar movies")
                }
            } catch (error) {
                console.error("Error fetching movie data", error);
            }
        }
        fetchSimilar();
    }, [])


    if (!selectedMovie) {
        return <p>Oops...</p>;
    }

    return (
        <>
            <div className='SingleMovie'
                style={{ backgroundImage: `linear-gradient(rgba(0, 4, 25, 0.5), rgba(0, 0, 0, 0.938)), url(${BACKDROP_PATH}/${selectedMovie.backdrop_path})`, backgroundRepeat: "no-repeat" }}
            >
                <div className='container'>
                    <section className="row">
                        <div className='YoutubePlayer text-center'>
                            <iframe mt-5 width="900" height="500" src={youtubeEmbedUrl}
                                title="Movie Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>
                        <div className='movieheader'></div>
                        <div className='col-lg-12 col-md-6 col-sm-12' >
                            <div className='headertext'>
                                <h1 className="text-white" >{selectedMovie.title} </h1>
                                <section className="row text-center mt-5">
                                    <div className="col-lg-3 col-sm-3 col-6 text-white">
                                        <h6>Release date: {selectedMovie.release_date}</h6>
                                    </div>
                                    <div className="col-lg-3 col-sm-3 col-6 text-white">
                                        <h6>Duration: {selectedMovie.runtime} min.</h6>
                                    </div>
                                    <div className="col-lg-3 col-sm-3 col-6">
                                        <h6>Rating: {selectedMovie.vote_average}</h6>
                                    </div>
                                    <div className="col-lg-3 col-sm-3 col-6">
                                        <h6>Original language: {selectedMovie.original_language}</h6>
                                    </div>
                                </section>
                                <p className=' mt-3 text-white'>{selectedMovie.overview}</p>
                            </div >
                            <span className="col-lg-2 col-md-6 col-sm-12 mt-3">
                                <p>  {selectedMovie.genres.map((genre) => (
                                    <div className="genreSection col-lg-2 col-sm-2 col-6 text-white" style={{ display: "inline-block" }}>
                                        <p key={genre.id}>{genre.name}</p>
                                    </div>
                                ))}</p>
                            </span>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Watch Providers:</p>
                                {selectedMovie?.['watch/providers']?.results?.CR?.flatrate.map((provider) => (
                                    <div key={provider.provider_id}>
                                        <img src={provider.logo_path} style={{ width: "5rem" }} />
                                        <p >{provider.provider_name}</p>
                                    </div>
                                ))}
                            </div>
                           {/*  <div className="text-center d-flex pt-3">
                                {selectedMovieSimilar.map((movie) => (
                                    <Card key={movie.id} movie={movie} />
                                ))}
                            </div> */}
                        </div>
                    </section >
                </div>
            </div>
        </>
    )
}
export default SingleMovie
