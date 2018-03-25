import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import auth from "../firebase.js";
import {database} from "../firebase.js";

export default class Signup extends React.Component{
	state={
		email:"",
		password:"",
		verifypassword:""
	}

	setEmail = (e) => {
		e.preventDefault();
		this.setState({
			email:e.target.value
		});
	}

	setPassword = (e) => {
		e.preventDefault();
		this.setState({
			password:e.target.value
		});
	}

	setVerifyPassword = (e) => {
		e.preventDefault();
		this.setState({
			verifypassword:e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.password !== this.state.verifypassword){
			alert("The verify password does not match with the password")
			this.setState({
				username:"",
				password:"",
				verifypassword:""
			});
		} else{
			auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
				localStorage.setItem('apiToken', user.uid);
				localStorage.setItem('username', user.email);
				let userRef = user.email.replace(/@|\./g, '-');
				database.ref().child(userRef).set('');
				this.props.history.push('/watch');
			}).catch((error)=>{
				console.log(error);
			});
		}
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Email</label>
					<input type="text" onChange={this.setEmail} placeholder="email"/>
				</div>
				<div>
					<label>Password</label>
					<input type="password" onChange={this.setPassword} placeholder="password"/>
				</div>
				<div>
					<label>Verify Password</label>
					<input type="password" onChange={this.setVerifyPassword} placeholder="verify password"/>
				</div>
				<RaisedButton type="submit">Signup</RaisedButton>
			</form>
		);
	}
}