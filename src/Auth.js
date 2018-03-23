import auth0 from "auth0-js";

export default class Auth {
	auth0 = new auth0.WebAuth({    
		domain: 'wang2467.auth0.com',
		clientID: 'Q5uWkqUcoo6eKd7vZWf3aTQt89QGesmE',
		redirectUri: 'http://localhost:3000/callback',
		audience: 'https://wang2467.auth0.com/userinfo',
		responseType: 'token id_token',
		scope: 'openid'
	});

	login = () => {
		this.auth0.authorize();
	}

	handleAuthentication = () => {
		this.auth0.parseHash((error, authResult) => {
			console.log(authResult);
			this.setSession(authResult);
		});
	}

	setSession = (authResult) =>{
		console.log("here");
	}

	isAuthenticated = () =>{
		return false;
	}
}
