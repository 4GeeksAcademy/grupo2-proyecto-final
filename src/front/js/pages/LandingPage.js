import React from 'react'
import movplusImageUrl from "../../img/mov+icon_white.png"
import { Link } from 'react-router-dom';
import "../../styles/LandinP.css";


export const landingPage = () => {
    return (
        <>
            <div className='landingPageStyle'>
                <div className='landHeader'>
                    <span className='header'>
                        <img src={movplusImageUrl} style={{ height: "3rem", marginLeft: "1rem", marginTop: "1rem" }} />
                        <Link to={"/login"}>
                            <button type="button" className="btn btn-lg btn-header">Sign In</button>
                        </Link>
                    </span>
                    <div className='container'>
                        <div className='text-center'>
                            <h1>Get unlimited movies recommendations </h1>
                            <h3>Access anywhere </h3>
                            <h5>Join our community! </h5>
                            <div className='btnsection'>
                                <Link to={"/signup"}>
                                    <button type="button" className="btn btn-lg btn-get-started">Get Started </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='linep' />
                </div>
                <div className='landBody'>
                    {/* <div className='container' > */}
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Not sure what to watch?</h4>
                            <p>
                                Get the best movies recommendations, made <span style={{ color: "#FBBC04" }} >just for you.</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="firstsection">
                                <img src="https://create.vista.com/s3-static/create/uploads/2022/09/make-movie-poster-online-900x891-1.webp" />
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="secsection">
                                <img src="https://images.moviesanywhere.com/a0b5c178993c743d9de4a0d3333b4c7a/f4b2f13d-9500-4416-a30c-0563ace31d12.png?r=331%2F174&w=2400" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <h4>Easy to access</h4>
                            <p>
                                Enjoy our catalogue from any of your devices, <span style={{ color: "#FBBC04" }} >to infinity and beyond.</span>
                            </p>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Perfect for busy people</h4>
                            <p>
                                You won't have to worry <span style={{ color: "#FBBC04" }} >about time</span>, just filter the movies with the time available function.
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="thirdsection">
                                <img src="https://www.cogeco.ca/sites/default/files/2023-08/EST-hero-lg-bw-1-en.png" />
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <div className="fourthsection">
                                <img src="https://images.lifestyleasia.com/wp-content/uploads/sites/5/2023/06/19114524/joe_hisaishi_-_howls_moving_castle_-_lp_-_clear_orange_-_tjja10030c_-_4560452131111_-_f-1024x625.png" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <h4>Made for every moviebuff.</h4>
                            <p>
                                Unlimited content for everyone, and <span style={{ color: "#FBBC04" }} >they're precious</span> movies.
                            </p>
                        </div>
                    </section>
                    {/* </div> */}
                    <div className='movApp'>
                        <div className='line' />
                        <div className='container'>
                            <div className='text-center'>
                                <h2>Get the Mov+ App</h2>
                            </div>
                            <div className='text-center'>
                                <h6> Coming soon in all mobile app stores</h6>
                                <div className='faqbtn'>
                                    <Link to={"/signup"}>
                                        <button type="button" className="btn btn-lg">Get Started </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='liney' />
                </div>
            </div>
        </>
    )
}

export default landingPage