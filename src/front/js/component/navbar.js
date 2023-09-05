import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';
import movplusImageUrl from "../../img/mov+icon.png";
import avatarImageUrl from "../../img/avatar.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (

		(store.viewLogged === false) ?

			(<nav className="navbar navbar-expand-lg navbar-dark fixed-top">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img src={movplusImageUrl} style={{ height: "3rem" }} alt="Logo" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mb-2 mb-lg-0 navbar-list not-logged-link">
							<li className="nav-item">
								<Link className="nav-link nav-link-signin" to="/login">
									Sign In
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>)

			:

			(<nav className="navbar navbar-expand-lg navbar-dark fixed-top">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img src={movplusImageUrl} style={{ height: "3rem" }} alt="Logo" />
          </Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mb-2 mb-lg-0 navbar-list">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/movies">
									Movies
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/playlist">
									Watch Later
								</Link>
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
								>
									<img src={avatarImageUrl} style={{ height: "2.5rem" }} alt="Avatar" />
								</a>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to="/user_profile">
											User Profile
										</Link>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<Link className="dropdown-logout-btn" to="/">
											<button className="dropdown-item" onClick={actions.logout}>
												Logout
											</button>
										</Link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			)
	);
};