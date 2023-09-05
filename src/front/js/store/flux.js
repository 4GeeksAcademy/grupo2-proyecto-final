const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			viewSignUp: false,
			viewLogged: false,

			user_id: null,
			email: null,
			password: null,
			token: null,
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

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
						localStorage.setItem("token", data.access_token)
						setStore({ viewLogged: true, user_id: data.user_id })
					} else alert(data.message);

				} catch (err) {
					console.error("An error has occurred during login", err);
				}
			},

			signUp: async (email, password) => {
				if (!email || !password) {
					alert("Please enter both email and password");
				}
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

					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						alert("User registered successfully")
						setStore({ viewSignUp: true })
					} else {
						alert(data.message);
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

			logout: () => {
				localStorage.clear();
				setStore({ viewLogged: false })
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

			// adds a movie to the user's watch later list
			addToWatchLater: async (selectedItem) => {
				const token = localStorage.getItem("token");
				setStore({ token: token });
				console.log("Adding to Watch Later list:", selectedItem);
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
							alert("A movie was added to the Watch Later list successfully");
							console.log("A movie was added to the Watch Later list successfully");
						} else {
							console.log(data.message);
							alert("This movie was already added");
						}
					} else {
						console.log("Request failed with status:", resp.status);
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				}
			},

			// deletes a movie to the user's watch later listt
			deleteFavorites: async (selectedFavorite) => {
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

					const resp = await fetch(`${process.env.BACKEND_URL}/api/playlist/${selectedFavorite.id}`, options);

					if (resp.ok) {
						const data = await resp.json();
						console.log(data.message);
						const listOfFavorites = getStore().favorites;
						setStore({ favorites: listOfFavorites.filter((item) => item.id !== selectedFavorite.id) });
						console.log("The movie was removed from favorites");
					} else {
						console.log("Request failed with status:", resp.status);
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				};
			},
		}
	}
};

export default getState;
