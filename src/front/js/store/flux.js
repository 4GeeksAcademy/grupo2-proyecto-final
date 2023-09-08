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

			watchLaterList: [],
			message: null,

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
						localStorage.setItem("token", data.access_token);
						setStore({ viewLogged: true, user_id: data.user_id, token: data.access_token });
						// Use SweetAlert2 for success login in message
						Toast.fire({
							icon: 'success',
							title: 'Log In Successful',
						});
					} else {
						// Use SweetAlert2 for error messages
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

			signUp: async (email, password, confirmPassword) => {
				if (!email || !password) {
					// Use SweetAlert2 for error messages while signing up
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
						// Use SweetAlert2 for sign up success message
						Toast.fire({
							icon: 'success',
							title: 'Sign Up Successful',
						});
						setStore({ viewSignUp: true })
					} else {
						// Use SweetAlert2 for error messages while signing up
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

			private: async () => {
				const token = localStorage.getItem("token");
				setStore({ token: token });

				try {
					const options = {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					};

					const resp = await fetch(process.env.BACKEND_URL + "/api/private", options);
					const data = await resp.json();
					setStore({ loggedUser: data.User });
					console.log(store.loggedUser);
				}

				catch (err) {
					console.error("An error has occurred", err);
				}
			},

			//update user information
			updateProfile: async (updatedData) => {
				const token = localStorage.getItem("token");
				setStore({ token: token });

				if (!token) {
					// Use SweetAlert2 for error message when not logged in
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
						// Use SweetAlert2 for successful password change message
						Toast.fire({
							icon: 'success',
							title: 'Password updated successfully',
						});
					} else {
						// Use SweetAlert2 for error messages while changing password
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

			logout: () => {
				localStorage.clear();
				setStore({ viewLogged: false, token: "" })
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

					const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?&language=en`, options);
					const data = await resp.json();

					const movieDetailsPromises = data.results.map(async movie => {
						const movieDetailsResp = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
						const movieDetails = await movieDetailsResp.json();
						return { ...movie, runtime: movieDetails.runtime };
					});

					const popularMoviesWithRuntime = await Promise.all(movieDetailsPromises);

					setStore({ filteredMovies: popularMoviesWithRuntime });

				} catch (err) {
					console.error("Error fetching popular movies:", err);
				}
			},

			// fetches genres and languages from API
			fetchGenresAndLanguages: () => {
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `${process.env.API_BEARER_TOKEN}`
					}
				};

				fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
					.then(response => response.json())
					.then(data => setStore({ genres: data.genres }))
					.catch(err => console.error('Error fetching genres:', err));

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

					if (selectedGenre) {
						apiUrl += `&with_genres=${selectedGenre}`;
					}

					if (selectedLanguage) {
						apiUrl += `&language=${selectedLanguage}`;
					}

					const resp = await fetch(apiUrl, options);
					const data = await resp.json();

					const movieDetailsPromises = data.results.map(async movie => {
						const movieDetailsResp = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
						const movieDetails = await movieDetailsResp.json();
						return { ...movie, runtime: movieDetails.runtime };
					});

					const moviesWithRuntime = await Promise.all(movieDetailsPromises);

					let filteredMoviesData = moviesWithRuntime;

					if (selectedRuntime) {
						filteredMoviesData = moviesWithRuntime.filter(movie => movie.runtime <= selectedRuntime); // Filter movies by runtime
					}

					setStore({ filteredMovies: filteredMoviesData || [] });

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
			filterMoviesWithSearchBar: (searchWord) => {
				try {
					const filteredInfo = getStore().filteredMovies.filter(movie => {
						const title = movie.title.toLowerCase();
						const currentWordLower = searchWord.toLowerCase();
						return title.includes(currentWordLower);
					});
					setStore({ filteredMovies: filteredInfo });
				} catch (err) {
					console.error("An error occurred while searching movies with the search bar:", err);
				}
			},

			// clears filters applied on movies search
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

			// adds a movie to the user's watchlist
			addToWatchLater: async (selectedItem) => {
				const token = localStorage.getItem("token");
				setStore({ token: token });
				console.log("Adding to Watchlist:", selectedItem);
				const user_id = getStore().user_id;
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
						const watchLaterPlaylist = getStore().watchLaterList;
						if (!watchLaterPlaylist.some(item => item.id === selectedItem.id)) {
							setStore({ watchLaterList: [...watchLaterPlaylist, selectedItem] });
							// Use SweetAlert2 to alert when movie is added successfully
							Toast.fire({
								icon: 'success',
								title: 'The movie was added successfully',
							});
							console.log("A movie was added to Watchlist successfully");
						}
					} else {
						console.log("Movie Already Added", resp.status);
						// Use SweetAlert2 for error messages when adding movies to the watchlist
						Swal.fire({
							icon: 'error',
							title: 'This movie was already added',
						});
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				}
			},

			// deletes a movie from the user's watchlist
			deleteFromWatchList: async (selectedMovie) => {
				const token = localStorage.getItem("token");
				setStore({ token: token });

				try {
					const options = {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
					};

					const resp = await fetch(`${process.env.BACKEND_URL}/api/playlist/${selectedMovie.id}`, options);

					if (resp.ok) {
						const data = await resp.json();
						console.log(data.message);
						const watchLaterPlaylist = getStore().watchLaterList;
						setStore({ watchLaterList: watchLaterPlaylist.filter((item) => item.id !== selectedMovie.id) });
						console.log("The movie was removed from watchlist");
						// Use SweetAlert2 to alert when movie is deleted successfully
						Toast.fire({
							icon: 'success',
							title: 'The movie was deleted successfully',
						});
					} else {
						console.log("Request failed with status:", resp.status);
						// Use SweetAlert2 for error messages when adding movies to the watchlist
						Swal.fire({
							icon: 'error',
							title: "The movie was already deleted",
						});
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				};
			},
		}
	}
};

export default getState;
