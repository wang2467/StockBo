import React from "react";

export default class Form extends React.Component {
	render() {
		return(
			<form onSubmit={this.props.addTicker}>
				<input type="text" name="symbol"/>
				<button className="btn btn-default btn-watch">
					<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
					Watch
				</button>
			</form>
		);
	}
}