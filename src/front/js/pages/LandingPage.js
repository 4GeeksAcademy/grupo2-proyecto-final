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
                            <button type="button" class="btn btn-lg">Sign In</button>
                        </Link>
                    </span>
                    <div className='container'>
                        <div className='text-center'>

                            <h1>Get unlimited movies reccomendations. </h1>
                            <h3>Access anywhere. </h3>
                            <h5>Join our community! </h5>
                            <div className='btnsection'>
                                <Link to={"/signup"}>
                                    <button type="button" class="btn btn-lg">Get Started </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='linep' />
                </div>
                <div className='landBody'>
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Not sure what to watch?</h4>
                            <p>
                                Get the best movies recomendations, made <span style={{ color: "#F2D649" }} >just for you.</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="firstsection">
                                <img src="https://create.vista.com/s3-static/create/uploads/2022/09/make-vintage-poster-online-900x891-1.webp" />
                            </div>
                        </div>
                    </section>
                    {/* <div className='line' /> */}
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="secsection">
                                <img src="https://images.moviesanywhere.com/a0b5c178993c743d9de4a0d3333b4c7a/f4b2f13d-9500-4416-a30c-0563ace31d12.png?r=331%2F174&w=2400" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <h4>Easy to access</h4>
                            <p>
                                Enjoy our catalogue from any of your devices, <span style={{ color: "#F2D649" }} >to infity and beyond.</span>
                            </p>
                        </div>
                    </section>
                    {/* <div className='line' /> */}
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Perfect for busy people</h4>
                            <p>
                                You won't have to worry <span style={{ color: "#F2D649" }} >about time</span>, just filter the movies with the time available function.
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="thirdsection">
                                <img src="https://www.cogeco.ca/sites/default/files/2023-08/EST-hero-lg-bw-1-en.png" />
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="secsection">
                                <img src="https://media.vanityfair.com/photos/5f7f5615e8db9d15dff9ba7b/master/w_2560%2Cc_limit/disney-halloween-movies.png" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <h4>Made for every moviebuff.</h4>
                            <p>
                                Unlimited content for everyone, and <span style={{ color: "#F2D649" }} >they're precious</span> movies.
                            </p>
                        </div>
                    </section>
                    <div className='line' />
                    <div className='container'>
                        <div className='text-center'>
                            <h2>Frequently Asked Questions </h2>
                        </div>
                        <ul className="list-group">
                            <div className='faq'>Lorem ipsum dolor</div>
                            <div className='faq'>Lorem ipsum dolor</div>
                            <div className='faq'>Lorem ipsum dolor</div>
                            <div className='faq'>Lorem ipsum dolor</div>
                            <div className='faq'>Lorem ipsum dolor</div>
                            <div className='faq'>Lorem ipsum dolor</div>
                        </ul>
                        <div className='text-center'>
                            <h6> Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam</h6>
                            <div className='faqbtn'>
                                <Link to={"/signup"}>
                                    <button type="button" class="btn btn-lg">Get Started </button>
                                </Link>
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