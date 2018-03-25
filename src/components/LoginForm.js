import React from "react";
import auth from "../firebase.js";

export default class LoginForm extends React.Component {
	state = {
		email:"",
		password:"",
	};

	setEmail = (e) => {
		this.setState({
			email:e.target.value
		});
	}

	setPassword = (e) => {
		this.setState({
			password:e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
			localStorage.setItem('firebaseAuthInProgress', true);
			this.setState({
				email:"",
				password:""
			});	
		}).catch((error) => {
			console.log(error)
			alert("Email or Password Incorrect");
			localStorage.removeItem('firebaseAuthInProgress');
		});
	}

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
			<button type="submit" className="btn btn-default btn-login" disabled={isInvalid}>Login</button>
			</form>
		);
	}
}