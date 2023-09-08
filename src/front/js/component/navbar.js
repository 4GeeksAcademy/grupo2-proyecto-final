import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from '../store/appContext';
import Lottie from 'react-lottie';
import animationData from '../../img/avatar.json';
import movplusImageUrl from "../../img/mov+icon.png";
import avatarImageUrl from "../../img/avatar.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();

	// Lottie icons configurations
	const options = {
		loop: false,
		autoplay: false,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
			height: "3rem",
			width: "3rem",
			className: "lottie-svg-class",
			id: "lottie-svg-id"
		}
	};

	const [stopped, setStopped] = useState(true);

	return (

		(!store.token) ?
			// Navbar when logged out
			(<nav className="navbar navbar-expand-lg fixed-top">
				<div className="container-fluid justify-content-between">
					<div className="d-flex">
						<a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="/">
							<img
								src={movplusImageUrl}
								style={{ height: "3rem", marginTop: "2px" }}
								alt="Mov+ Logo"
								loading="lazy"
							/>
						</a>
					</div>
					<ul className="navbar-nav flex-row d-none d-md-flex">
						<li className="nav-item me-3 me-lg-1 active">
							{/* Renders sign up if it is login page */}
							{
								(location.pathname === "/login") ?
									(<a className="nav-link nav-link-signin" href="/signup">
										<span>
											<i className="fas fa-user-plus fa-md"></i>&nbsp;Sign Up
										</span>
									</a>) : (<a className="nav-link nav-link-signin" href="/login">
										<span>
											<i className="fas fa-unlock fa-md"></i>&nbsp;Log In
										</span>
									</a>)
							}
						</li>
					</ul>
				</div>
			</nav>)

			:

			// Navbar when logged in
			(<nav className="navbar navbar-expand-lg fixed-top">
				<div className="container-fluid justify-content-between">
					<div className="d-flex">
						<a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
							<img
								src={movplusImageUrl}
								style={{ height: "3rem", marginTop: "2px" }}
								alt="Mov+ Logo"
								loading="lazy"
							/>
						</a>
					</div>
					<ul className="navbar-nav flex-row d-none d-md-flex">
						<li className="nav-item me-3 me-lg-1 active">
							<a className="nav-link" href="/">
								<span><i className="fas fa-home fa-md"></i>&nbsp;Home</span>
							</a>
						</li>

						<li className="nav-item me-3 me-lg-1">
							<a className="nav-link" href="/movies">
								<span><i className="fas fa-video fa-md"></i>&nbsp;Movies</span>
							</a>
						</li>

						<li className="nav-item me-3 me-lg-1">
							<a className="nav-link" href="/watchlist">
								<span><i className="fas fa-eye fa-md"></i>&nbsp;Watchlist</span>
							</a>
						</li>

					</ul>
					<ul className="navbar-nav navbar-dropdown">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onMouseEnter={() => { setStopped(false) }}
								onMouseLeave={() => { setStopped(true) }}
							>
								{/* Testing Lottie */}
								<span className="d-flex">
									<Lottie options={options} isClickToPauseDisabled isStopped={stopped} />&nbsp;
									<i className="fas fa-chevron-circle-down fa-sm"></i>
								</span>
								{/* <img src={avatarImageUrl} style={{ height: "2.5rem" }} alt="Avatar" />&nbsp; */}
								{/* <i className="fas fa-chevron-circle-down fa-sm"></i> */}
							</a>
							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
								<li>
									<Link className="dropdown-item" to="/userprofile">
										<i className="fa-solid fa-user"></i>
										My Profile
									</Link>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<Link className="dropdown-logout-btn" to="/">
										<button className="dropdown-item" onClick={actions.logout}>
											<i className="fa-solid fa-arrow-right-from-bracket"></i>
											Logout
										</button>
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>)
	);
};