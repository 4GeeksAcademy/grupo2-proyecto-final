import Swal from 'sweetalert2';

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			viewSignUp: false,
			viewLogged: false,

			user_id: null,
			email: null,
			password: null,
			token: "",
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			loggedUser: "",

			selectedMovieSimilar: [],
			similarMovies: [],
			watchLaterList: [],
			message: "",
			isSubmitted: false,

			selectedMovie: [],
			genres: [],
			selectedGenre: "",
			languages: [],
			selectedLanguage: "",
			selectedRuntime: "",
			filteredMovies: [],
			currentWord: "",
			searchWord: "",
			recommendations: true,

			sectionTitle: "Popular Movies",
		},
		actions: {
			// gets token from browser's local storage
			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				if (token && token !== "" && token !== undefined && token !== null) {
					// saves the token in store
					setStore({ token: token });
				}
			},
			// sends typed email and password by the user to the login API route
			login: async (email, password) => {
				try {
					const options = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					};

					const resp = await fetch(process.env.BACKEND_URL + "/api/login", options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						// sets the token and user_id in the browser's local storage
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("user_id", data.user_id);
						// turns logged view on and saves user_id and token to store
						setStore({ viewLogged: true, user_id: data.user_id, token: data.access_token });
						// SweetAlert2 for successful login message
						Toast.fire({
							icon: 'success',
							title: 'Log In Successful',
						});
					} else {
						// SweetAlert2 for error message during login
						Swal.fire({
							icon: 'error',
							title: 'Log In Failed',
							text: data.message,
						});
					}
				} catch (err) {
					console.error("An error has occurred during login", err);
				}
			},
			// sends email, password and confirmation password to the signup API route
			signUp: async (email, password, confirmPassword) => {
				if (!email || !password) {
					// SweetAlert2 for error message when email or password are missing
					Swal.fire({
						icon: 'error',
						title: 'Sign Up Failed',
						text: 'Please enter both email and password',
					});
				}
				try {
					const options = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email": email,
							"password": password,
							"confirm_password": confirmPassword
						})
					};

					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						// SweetAlert2 for successful sign up
						Toast.fire({
							icon: 'success',
							title: 'Sign Up Successful',
						});
						//turns signup view on
						setStore({ viewSignUp: true })
					} else {
						// SweetAlert2 for error messages while signing up
						Swal.fire({
							icon: 'error',
							title: 'Sign Up Failed',
							text: data.message,
						});
					}

				} catch (err) {
					console.error("An error has occurred during signup", err);
				}
			},

			//update user password - sends new and confimation password to updatepassword API route
			updateProfile: async (updatedData) => {
				// retrieves token in browser's local storage
				const token = localStorage.getItem("token");
				// store token in global state
				setStore({ token: token });

				if (!token) {
					// SweetAlert2 for error message when not logged in
					Swal.fire({
						icon: 'error',
						title: 'You Must Log In First',
						text: 'You are not logged in. Please log in to update your password',
					});
					return;
				}

				try {
					const options = {
						method: 'PUT',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({
							"current_password": updatedData.currentPassword,
							"new_password": updatedData.newPassword
						})
					};

					const resp = await fetch(process.env.BACKEND_URL + "/api/updatepassword", options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						// SweetAlert2 for successful password change
						Toast.fire({
							icon: 'success',
							title: 'Password updated successfully',
						});
						getActions().setCurrentPassword("");
						getActions().setNewPassword("");
						getActions().setConfirmPassword("");
					} else {
						// SweetAlert2 for error messages while changing password
						Swal.fire({
							icon: 'error',
							title: 'Password Update Failed',
							text: data.message,
						});
					}

				} catch (err) {
					console.error("An error has occurred while updating the password", err);
				}
			},

			//password recovery - sends reset_token, new and confirmation password to API route
			passwordRecovery: async (email) => {
				try {
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							"email": email,
						})
					};

					const response = await fetch(process.env.BACKEND_URL + '/api/password-recovery', options);
					const data = await response.json();
					console.log(data);
					if (response.ok) {
						// sets instructions message
						getActions().setMessage("Check your email for password reset instructions.");
						// sets global state to true if password email was send successfully
						getActions().setIsSubmitted(true);
						// SweetAlert2 for successful password reset email
						Swal.fire({
							icon: 'success',
							title: 'Password Reset Email Sent',
							text: data.message,
						});
					} else {
						console.error('Password reset failed:', data.message);
						// SweetAlert2 for error while sending password reset email
						Swal.fire({
							icon: 'error',
							title: 'Password Reset Failed',
							text: data.message,
						});
					}
				} catch (error) {
					console.error('An error occurred during password reset:', error);
				};
			},

			//password reset - sends reset_token, new and confirmation password to API route
			passwordReset: async (password, confirmPassword, token) => {
				if (!password) {
					// SweetAlert2 for error message when no password is given
					Swal.fire({
						icon: 'error',
						title: 'Password Reset Failed',
						text: 'You must provide a new password',
					});
					return;
				}

				try {
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							"new_password": password,
							"confirm_password": confirmPassword,
							"token": token
						})
					};

					const resp = await fetch(process.env.BACKEND_URL + "/api/reset_password/" + token, options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						// SweetAlert2 for successful password reset
						Toast.fire({
							icon: 'success',
							title: 'Password Reset Successful',
						});
					} else {
						// SweetAlert2 for error messages while resetting password
						Swal.fire({
							icon: 'error',
							title: 'Password Reset Failed',
							text: data.message,
						});
					}

				} catch (err) {
					console.error("An error has occurred while resetting the password", err);
				}
			},
			// function for logout button
			logout: () => {
				// clears the browser's local storage 
				localStorage.clear();
				// sets global states for token, user_id and viewLogged to initial states
				setStore({ viewLogged: false, token: "", user_id: null });
			},

			toggleSignUp: (value) => {
				setStore({ viewSignUp: value })
			},

			// fetches popular movies list and their runtimes
			fetchPopularMovies: async () => {
				try {
					const options = {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: `${process.env.API_BEARER_TOKEN}`
						}
					};
					// fetches popular movies from themoviedb API
					const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?&language=en`, options);
					const data = await resp.json();
					// maps through each movie to fetch the movie's runtime 
					const movieDetailsPromises = data.results.map(async movie => {
						const movieDetailsResp = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
						const movieDetails = await movieDetailsResp.json();
						return { ...movie, runtime: movieDetails.runtime };
					});

					const popularMoviesWithRuntime = await Promise.all(movieDetailsPromises);
					//adds popular movies with their runtime to the global store
					setStore({ filteredMovies: popularMoviesWithRuntime });

				} catch (err) {
					console.error("Error fetching popular movies:", err);
				}
			},

			// fetches genres and languages from themoviedb API
			fetchGenresAndLanguages: () => {
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `${process.env.API_BEARER_TOKEN}`
					}
				};
				//fetches the genres list from themoviedb API
				fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
					.then(response => response.json())
					.then(data => setStore({ genres: data.genres }))
					.catch(err => console.error('Error fetching genres:', err));
				// fetches the languages list from themoviedb API
				fetch('https://api.themoviedb.org/3/configuration/languages', options)
					.then(response => response.json())
					.then(data => setStore({ languages: data }))
					.catch(err => console.error('Error fetching languages:', err))
			},

			// fetches runtime and filters movies by genre, language and runtime
			fetchFilteredMovies: async (selectedGenre, selectedLanguage, selectedRuntime) => {
				try {
					const options = {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: `${process.env.API_BEARER_TOKEN}`
						}
					};

					let apiUrl = 'https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc';

					// filters movies by genre
					if (selectedGenre) {
						apiUrl += `&with_genres=${selectedGenre}`;
					}
					// filters movies by language
					if (selectedLanguage) {
						apiUrl += `&language=${selectedLanguage}`;
					}

					const resp = await fetch(apiUrl, options);
					const data = await resp.json();
					// fetches each movie runtime
					const movieDetailsPromises = data.results.map(async movie => {
						const movieDetailsResp = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
						const movieDetails = await movieDetailsResp.json();
						return { ...movie, runtime: movieDetails.runtime };
					});

					const moviesWithRuntime = await Promise.all(movieDetailsPromises);

					let filteredMoviesData = moviesWithRuntime;
					// filter movie by runtime
					if (selectedRuntime) {
						filteredMoviesData = moviesWithRuntime.filter(movie => movie.runtime <= selectedRuntime);
					}
					// saves the filtered movies to global state
					setStore({ filteredMovies: filteredMoviesData || [] });
					// sets the recommendations' state if there is any recommended movie in the global state
					if (filteredMoviesData.length === 0) {
						setStore({ recommendations: false });
					} else {
						setStore({ recommendations: true });
					}
				} catch (err) {
					console.error("Error fetching filtered movies:", err);
				}
			},

			// filters movies by what's typed in the searchbar
			filterMoviesWithSearchBar: async (searchWord) => {

				const currentWordLower = searchWord.toLowerCase();

				try {
					const options = {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: `${process.env.API_BEARER_TOKEN}`
						}
					};
					// fetches movies from themoviedb API by keyword
					const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${currentWordLower}&page=1`, options);
					const data = await resp.json();

					// maps through each movie to fetch the movie's runtime 
					const movieDetailsPromises = data.results.map(async movie => {
						const movieDetailsResp = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
						const movieDetails = await movieDetailsResp.json();
						return { ...movie, runtime: movieDetails.runtime };
					});

					const moviesWithRuntime = await Promise.all(movieDetailsPromises);
					//adds popular movies with their runtime to the global store
					setStore({ filteredMovies: moviesWithRuntime });

				} catch (err) {
					console.error("An error occurred while searching movies with the search bar:", err);
				}
			},

			// clears filters applied on movies' search
			clearFiltersButton: () => {
				setStore({
					selectedGenre: "",
					selectedLanguage: "",
					selectedRuntime: "",
					currentWord: "",
					recommendations: true,
				});
				getActions().fetchPopularMovies();
				getActions().setSectionTitle("Popular Movies");
			},

			// stores the data selected in the filter selectors to the global state
			setSelectedGenre: (selectedGenre) => {
				setStore({ selectedGenre });
			},
			setSelectedLanguage: (selectedLanguage) => {
				setStore({ selectedLanguage });
			},
			setSelectedRuntime: (selectedRuntime) => {
				setStore({ selectedRuntime });
			},
			// stores the text input to the global state
			updateSearchWord: (searchWord) => {
				setStore({ searchWord });
			},
			// stores section title
			setSectionTitle: (sectionTitle) => {
				setStore({ sectionTitle });
			},
			// stores current password
			setCurrentPassword: (currentPassword) => {
				setStore({ currentPassword })
			},
			// stores new password
			setNewPassword: (newPassword) => {
				setStore({ newPassword })
			},
			// stores confirm password
			setConfirmPassword: (confirmPassword) => {
				setStore({ confirmPassword })
			},
			//sets section title when filtered
			titleConditional: () => {
				const chosenGenre = getStore().selectedGenre;
				const chosenLanguage = getStore().selectedLanguage;
				const chosenRuntime = getStore().selectedRuntime;

				if (chosenGenre || chosenLanguage || chosenRuntime || getStore().searchWord) {
					getActions().setSectionTitle("Recommended Movies");
				} else {
					getActions().setSectionTitle("Popular Movies");
				}
			},

			// stores watchlist
			setWatchLaterList: (watchLaterList) => {
				setStore({ watchLaterList });
			},

			// stores password reset instructions
			setMessage: (message) => {
				setStore({ message });
			},

			// stores if email was submitted to then show the instructions message
			setIsSubmitted: (isSubmitted) => {
				setStore({ isSubmitted });
			},

			// adds a movie to the user's watchlist
			addToWatchLater: async (selectedItem) => {
				// retrieves the browser's local storage
				const user_id = localStorage.getItem("user_id");
				const token = localStorage.getItem("token");
				// saves token and user_id to global state
				setStore({ token: token, user_id: user_id });
				console.log("Adding to Watchlist:", selectedItem);

				if (!user_id) {
					console.log("Please enter the user id");
					return;
				}

				try {
					const options = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({
							"user_id": user_id,
							"movie_data": {
								"id": selectedItem.id,
								"title": selectedItem.title,
								"overview": selectedItem.overview,
								"poster_path": selectedItem.poster_path,
								"release_date": selectedItem.release_date,
								"original_language": selectedItem.original_language,
								"runtime": selectedItem.runtime,
								"vote_average": selectedItem.vote_average,
							}
						})
					};

					console.log("selectedItem:", selectedItem);
					const resp = await fetch(`${process.env.BACKEND_URL}/api/playlist/${selectedItem.id}`, options);

					if (resp.ok) {
						const data = await resp.json();
						console.log(data.message);
						// retrieves current watchlist from the global state
						const watchLaterPlaylist = getStore().watchLaterList;
						// checks if movie was already added to watchlist
						if (!watchLaterPlaylist.some(item => item.id === selectedItem.id)) {
							// adds movie to the watchlist
							setStore({ watchLaterList: [...watchLaterPlaylist, selectedItem] });
							// SweetAlert2 to alert when movie is added successfully
							Toast.fire({
								icon: 'success',
								title: 'The movie was added successfully',
							});
							console.log("A movie was added to Watchlist successfully");
						}
					} else {
						console.log("Movie Already Added", resp.status);
						// SweetAlert2 for error messages when adding movies to the watchlist
						Swal.fire({
							icon: 'error',
							title: 'This movie was already added',
						});
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				}
			},

			// retrieves user's watchlist
			fetchWatchLaterMovies: async () => {
				// retrieves the browser's local storage
				const token = localStorage.getItem("token");
				const user_id = localStorage.getItem("user_id");
				// saves token and user_id to global state
				setStore({ token: token, user_id: user_id });

				try {
					const options = {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
					};

					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/playlist/${user_id}`, options);

					if (resp.ok) {
						const data = await resp.json();
						// syncs the watchLaterList global state with the API database
						getActions().setWatchLaterList(data.results);
						console.log("Watchlist fetched successfully:", data.results);
					} else {
						console.error('Error occurred while fetching the watchlist');
						// SweetAlert2 for error messages when fetching the user's watchlist
						Toast.fire({
							icon: 'error',
							title: 'Your watchlist is empty',
						});
					}
				} catch (error) {
					console.error('Error occurred while fetching the watchlist', error);
				}
			},

			// deletes a movie from the user's watchlist
			deleteFromWatchList: async (selectedMovie) => {
				// retrieves the browser's local storage
				const token = localStorage.getItem("token");
				// saves token to global state
				setStore({ token: token });

				try {
					const options = {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
					};

					const resp = await fetch(`${process.env.BACKEND_URL}/api/playlist/${selectedMovie.movie_id}`, options);

					if (resp.ok) {
						const data = await resp.json();
						console.log(data.message);
						// syncs the watchLaterList global state with the API database
						const watchLaterPlaylist = getStore().watchLaterList;
						// deletes movie from the watchlist and updates the global state
						setStore({ watchLaterList: watchLaterPlaylist.filter((item) => item.id !== selectedMovie.id) });
						console.log("The movie was removed from watchlist");
						// SweetAlert2 to alert when movie is deleted successfully
						Toast.fire({
							icon: 'success',
							title: 'The movie was deleted successfully',
						});
					} else {
						console.log("Request failed with status:", resp.status);
						// SweetAlert2 for error messages when deleting movies from the watchlist
						Swal.fire({
							icon: 'error',
							title: "The movie was already deleted",
						});
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				};
			},

			// Fetch movie trailer videos
			fetchVideos: async (params, setYoutubeEmbedUrl) => {
				try {
					const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
					const videoUrl = `https://api.themoviedb.org/3/movie/${params.theid}/videos?api_key=${API_key}&language=en-US`;
					const resp = await fetch(videoUrl);

					if (resp.ok) {
						const data = await resp.json();
						const trailer = data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
						if (trailer) {
							// extracts the trailer key
							const trailerKey = trailer.key;
							// builds the YouTube embed URL
							setYoutubeEmbedUrl(`https://www.youtube.com/embed/${trailerKey}`);
						} else {
							// sets URL to an empty string when there's no trailer found
							setYoutubeEmbedUrl("");
						}
					} else {
						console.error("Error fetching provider data");
					}
				} catch (error) {
					console.error("Error fetching movie data", error);
				}
			},

			// Fetch Watch Providers
			fetchProvider: async (params) => {
				try {
					const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
					const response = await fetch(
						`https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}&append_to_response=watch/providers`
					)
					if (response.ok) {
						const data = await response.json();
						setStore({ selectedMovie: data });
					} else {
						console.error("Error fetching provider data")
					}
				} catch (error) {
					console.error("Error fetching movie data", error);
				}
			},

			// Fetch similar movies
			fetchSimilar: async (params) => {
				try {
					const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
					const response = await fetch(
						`https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}&append_to_response=similar`
					)
					if (response.ok) {
						const data = await response.json()
						setStore({ selectedMovieSimilar: data.similar.results });
						setStore({ similarMovies: getStore().selectedMovieSimilar.slice(0, 5) });
					} else {
						console.error("Error fetching similar movies")
					}
				} catch (error) {
					console.error("Error fetching movie data", error);
				}
			},

			fetchMovie: async (params) => {
				try {
					const API_key = "491c31c8a0eb95d5d79ed9ed60929455";
					const response = await fetch(
						`https://api.themoviedb.org/3/movie/${params.theid}?api_key=${API_key}`

					)
					if (response.ok) {
						const data = await response.json();
						setStore({ selectedMovie: data });
					} else {
						console.error("Error fetching movie data");
					}
				} catch (error) {
					console.error("Error fetching movie data", error);
				}
			},

		}
	}
};

export default getState;
