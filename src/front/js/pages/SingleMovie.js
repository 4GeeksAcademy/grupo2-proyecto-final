import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/MovieView.css";

const SingleMovie = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState("");
    const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
    const movie_id = "808";
    const params = useParams();

    // Redirect to restricted page if not logged in
    useEffect(() => {
        if (!store.token) {
            navigate("/restricted-access");
            return;
        };
    })

    // Fetch Movie information
    useEffect(() => {

        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_key}`
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
    }, [])

    //Fetch Watch Providers

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_key}&append_to_response=watch/providers`
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


    if (!selectedMovie) {
        return <p>Oops...</p>;
    }

    return (
        <>
            <div className='SingleMovie' >
                <div className='container'>
                    <section className="row">
                        <div className='movieheader' />
                        <div className='col-lg-6 col-md-6 col-sm-12' >
                            <img className="movieimg"
                                src={`https://image.tmdb.org/t/p/w300/${selectedMovie.poster_path}`}
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                            <div className='headertext'>
                                <h1 className="mt-5 text-white" >{selectedMovie.title}</h1>
                                <p className='text-white'>{selectedMovie.overview}</p>
                            </div>
                        </div>
                    </section>
                    <hr className='text-white' />
                    <div className='moviebody' >
                        <section className="row text-center ">
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Release Date:</p>
                                <p>{selectedMovie.release_date}</p>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Original Language:</p>
                                <p>{selectedMovie.original_language}</p>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Genre:</p>
                                <p>  {selectedMovie.genres.map((genre) => (
                                    <p key={genre.id}>{genre.name}</p>
                                ))}</p>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Watch Providers:</p>
                                {selectedMovie?.['watch/providers']?.results?.BR?.flatrate.map((provider) => (
                                    <p key={provider.provider_id}>{provider.provider_name}</p>
                                ))}
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Rating:</p>
                                <p>{selectedMovie.vote_average}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SingleMovie
