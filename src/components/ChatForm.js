import React from "react";

export default class ChatForm extends React.Component{
	render(){
		return(
			<div>
				<form onSubmit={this.props.addMessages}>
					<input type="text" name="message" placeholder="enter message here"/>
					<button className="btn btn-default btn-msg">Send</button>
				</form>
			</div>
		)
	}
}