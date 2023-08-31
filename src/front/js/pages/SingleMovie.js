import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/MovieView.css";

const SingleMovie = () => {
    const { store, actions } = useContext(Context);
    const [selectedMovie, setSelectedMovie] = useState("");
    const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
    const movie_id = "00015";
    const params = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_key}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setSelectedMovie(data);
                } else {
                    console.error('Error fetching movie data');
                }
            } catch (error) {
                console.error('Error fetching movie data', error);
            }
        };

        fetchMovie();
    }, []);

    if (!selectedMovie) {
        return <p>Oops...</p>;
    }

    return (
        <>
            <div className='SingleMovie' >
                <div className='container'>
                    <section className="row">
                        <div className='movieheader' >
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12' >
                            <img className="movieimg"
                                src={`https://api.themoviedb.org/3/collection/${movie_id}/images/?api_key=${API_key}`}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                            <h1 className="mt-5 text-white" >{selectedMovie.title}</h1>
                            <p className='text-white'>{selectedMovie.overview}</p>
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
                                <p>{selectedMovie.genres.name}</p>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Watch Providers:</p>
                                <p>{selectedMovie.original_language}</p>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Ratings:</p>
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
