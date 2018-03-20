import React from "react";
import {firebase, auth} from "../firebase.js";

export default class LoginForm extends React.Component {
	this.state{
		email:"",
		password:""
	};

	setEmail = (e) => {
		this.setState({
			email:e.target.value;
		});
	}

	setPassword = (e) => {
		this.setState({
			password:e.target.value;
		});
	}

	// handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
	// 		this.setState({
	// 			email:"",
	// 			password:""
	// 		});	

	// 	}).catch((error){
	// 		alert("Email or Password Incorrect");
	// 	});
	// }


	render(){
		const email = this.state.email;
		const password = this.state.password;

		const isInvalid = email === "" || password === "";

		return(
			<form onSubmit={this.handleSubmit}>
			<div>
				<label>Email</label>
				<input
					onChange={this.setEmail}
					type="text"
					placeholder="Email Address"
				/>
			</div>
			<div>
				<label>Password</label>
				<input
					onChange={this.setPassword}
					type="password"
					placeholder="Password"
				/>
			</div>
			<button type="submit" class="btn btn-default btn-login">Login</button>
			</form>
		);
	}
}