import React from "react";
import ChatItem from "./ChatItem.js";

export default class ChatList extends React.Component{
	id = 0
	
	render(){
		var items = []
		for (var m in this.props.messages){
			items.push(<ChatItem key={this.id++} message={this.props.messages[m]}/>)
		}
		return(
			<div>
				<h1>ChatRoom</h1>
				{items}
			</div>
		)
	}
}