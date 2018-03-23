import React from "react";
import LoginForm from "./LoginForm.js";
import auth from "../firebase.js";


export default class Login extends React.Component{
	state = {
		authed:false
	}

	componentWillMount(){
		if (localStorage.getItem('apiToken')){
			this.props.history.push('/watch');
			return
		}
		auth.onAuthStateChanged((user) => {
			if (user){
				localStorage.removeItem('firebaseAuthInProgress');
				localStorage.setItem('apiToken', user.uid);
				localStorage.setItem('username', user.email);
				this.props.history.push('/watch');
			}
		})
	}

	render(){
		return(
			<div>
					<div>
						<h1>Login</h1>
						{(localStorage.getItem('firebaseAuthInProgress')) && <h1>Loading</h1>}
						{!(localStorage.getItem('firebaseAuthInProgress')) && <LoginForm login={this.props.login} history={this.props.history}/>}
					</div>
			</div>
		);
	}
}  