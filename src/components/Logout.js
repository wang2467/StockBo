import React from "react";
import auth from "../firebase.js"; 

export default class Logout extends React.Component{

	state={out:false}

	handleSubmit = (e) =>{
		e.preventDefault();
		auth.signOut().then(() => {
			localStorage.removeItem('apiToken');
			localStorage.removeItem('firebaseAuthInPorgress');
			localStorage.removeItem('username');
			this.setState({
				out:true
			});
		}).catch((error)=>{
			console.log(error);
		})
	}

	render(){
		return(
			<div>
				{!this.state.out ? (
				<div>
					<h1>Logout</h1>
					<button onClick={this.handleSubmit}>Logout</button>
				</div>)
				:(<h1>You have been logged out</h1>)}
			</div>
		);
	}
}
