import React from 'react'
import landingBg from "../../img/LandingPageBg.png";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from 'react-router-dom';
import "../../styles/LandinP.css";


export const landingPage = () => {
    return (
        <>
            <div className='landingPageStyle'>
                <div className='landHeader'>
                    <div className='container'>
                        <div className='text-center'>
                            <div className='space'></div>
                            <h1>Unlimited Movies, TV shows and more. </h1>
                            <h3>Watch anywhere. Cancel anytime. </h3>
                            <h5>Ready to watch? Subscribe now! </h5>
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
                                Get the best movies recomendations, made just for <span style={{ color: "#F2D649" }} >you.</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="firstsection">
                                <img src="https://create.vista.com/s3-static/create/uploads/2022/09/make-vintage-poster-online-900x891-1.webp" />
                            </div>
                        </div>
                    </section>
                    <div className='line' />
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="secsection">
                                <img src="https://getitem.com/images/g5.png" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <h4>Easy to access</h4>
                            <p>
                                
                            </p>
                        </div>
                    </section>
                    <div className='line' />
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Perfect for busy people</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="firstsection">
                                <img src={rigoImageUrl} />
                            </div>
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