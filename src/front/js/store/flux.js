const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			usersLogged: []

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				console.log("hola")
			},
			singInUp: async (data) => {
				const request = await fetch('https://ideal-tribble-j9r5jr6gpv53j6q5-3001.app.github.dev/api/users', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"name": data.name,
						"email": data.email,
						"password": data.password
					})
				})
				const response = await request.json()
				console.log(response)

			},
			logIn: async (data) => {
				console.log("esta es la data",data)
				const request = await fetch('https://ideal-tribble-j9r5jr6gpv53j6q5-3001.app.github.dev/api/login', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)})

				const response = await request.json()
				localStorage.setItem("token", response.access_token)
				setStore({ ...getStore(), token: response.access_token })
				console.log(response)
			},

			showUser: async () => {
				try{

					const token=localStorage.getItem("token")
					const request = await fetch('https://ideal-tribble-j9r5jr6gpv53j6q5-3001.app.github.dev/api/private', {
						method: 'GET',
						headers: { "Authorization": `Bearer ${token}` }
					})
	
					const response = await request.json()
					setStore({...getStore(),usersLogged:response.users})
	
				}
				catch(e){
					console.log(e)
				}
			},

			logOut: () => {
				localStorage.removeItem("token")
				setStore({})
				console.log("Deslogeado")
			}

		}
	}
}
export default getState;


// demo: [
// 	{
// 		title: "FIRST",
// 		background: "white",
// 		initial: "white"
// 	},
// 	{
// 		title: "SECOND",
// 		background: "white",
// 		initial: "white"
// 	}
// ]

// getMessage: async () => {
// 	try{
// 		// fetching data from the backend
// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
// 		const data = await resp.json()
// 		setStore({ message: data.message })
// 		// don't forget to return something, that is how the async resolves
// 		return data;
// 	}catch(error){
// 		console.log("Error loading message from backend", error)
// 	}
// },
// changeColor: (index, color) => {
// 	//get the store
// 	const store = getStore();

// 	//we have to loop the entire demo array to look for the respective index
// 	//and change its color
// 	const demo = store.demo.map((elm, i) => {
// 		if (i === index) elm.background = color;
// 		return elm;
// 	});

// 	//reset the global store
// 	setStore({ demo: demo });
// }
// }