import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/MovieView.css";

const SingleMovie = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <>
            <div className='SingleMovie' >
                <div className='container'>
                    <section className="row">
                        <div className='movieheader' >
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12' >
                            <img className="movieimg"
                                src={`https://api.themoviedb.org/3/collection/collection_id/images/${params.theid}`}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                            <h1 className="mt-5 text-white" >movie name</h1>
                            <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
                                quaerat dolorem corrupti incidunt eligendi, tenetur consectetur!
                                Eaque asperiores maiores totam quaerat? Blanditiis eius
                                necessitatibus beatae quam, ipsum quasi officiis vel! Rem saepe
                                consectetur quam minima facere totam praesentium, illum ea ratione
                                odit vel temporibus ad eos, quasi exercitationem.</p>
                        </div>
                    </section>
                    <hr className='text-white' />
                    <div className='moviebody' >
                        <section className="row text-center ">
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Release Date:</p>
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Translations:</p>
                                {/* <p>{properties.}</p> */}
                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Genre:</p>

                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Watch Providers:</p>

                            </div>
                            <div className="col-lg-2 col-sm-2 col-6 text-white">
                                <p className="fw-bold m-0">Ratings:</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SingleMovie
