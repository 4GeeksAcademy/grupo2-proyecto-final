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

			favorites: [],
			message: null,
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

			// adds a selected movie to the favorites' list of the user
			addFavorites: async (selectedItem) => {
				const token = localStorage.getItem("token");
				setStore({ token: token });
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
							"user_id": user_id
						})
					};

					const resp = await fetch(`${process.env.BACKEND_URL}/api/favorite/${selectedItem.id}`, options);

					if (resp.ok) {
						const data = await resp.json();
						console.log(data.message);
						const listOfFavorites = getStore().favorites;
						if (!listOfFavorites.some(item => item.id === selectedItem.id)) {
							setStore({ favorites: [...listOfFavorites, selectedItem] });
							console.log("Favorite movie was added successfully");
						} else {
							console.log(data.message);
						}
					} else {
						console.log("Request failed with status:", resp.status);
					}
				} catch (err) {
					console.error("An error has occurred:", err);
				}
			},

			//deletes a selectedFavorite Movie from favorites' list
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

					const resp = await fetch(`${process.env.BACKEND_URL}/api/favorite/${selectedFavorite.id}`, options);

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
