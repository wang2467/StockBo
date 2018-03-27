import React from "react";

export default class ChatItem extends React.Component{
	render(){
		return(
			<div>
				<p>{this.props.message}</p>
			</div>
		);	
	}
}