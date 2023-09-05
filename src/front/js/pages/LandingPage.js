import React from 'react'
import rigoImageUrl from "../../img/rigo-baby.jpg";
import movplusImageUrl from "../../img/mov+icon_white.png";
import { Link } from 'react-router-dom';
import "../../styles/LandinP.css";


export const landingPage = () => {
    return (
        <>
            <div className='landingPageStyle'>
                <span className='landHeader'>
                    <img src={movplusImageUrl} style={{ height: "3rem" }} />
                    <Link to={"/login"}>
                        <button type="button" className="btn btn-lg">Sign In</button>
                    </Link>
                </span>
                <div className='landBody'>
                    <div className='container'>
                        <div className='text-center'>
                            <h1>Unlimited Movies, TV shows and more. </h1>
                            <h3>Watch anywhere. Cancel anytime. </h3>
                            <h5>Ready to watch? Subscribe now! </h5>
                            <div className='btnsection'>
                                <Link to={"/signup"}>
                                    <button type="button" className="btn btn-lg">Get Started </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='linep' />
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Not sure what to watch?</h4>
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
                    <section className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="secsection">
                                <img src={rigoImageUrl} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h4>Easy to access</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
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
                                    <button type="button" className="btn btn-lg">Get Started </button>
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