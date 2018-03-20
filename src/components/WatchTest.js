import React from "react";

export default class WatchTest extends React.Component {
	render(){
		console.log(this.props.match.params);
		return(
			<div>
				<h1>This is a test {this.props.match.params.symbol}</h1>
			</div>
		);
	}
}