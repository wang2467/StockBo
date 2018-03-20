import React from "react";

export default class Stocks extends React.Component {
	render(){
		return(
			<div>
				{this.props.low && <p>Low: {this.props.low}</p>}
				{this.props.high && <p>High: {this.props.high}</p>}
				{this.props.open && <p>Open: {this.props.open}</p>}
				{this.props.close && <p>Close: {this.props.close}</p>}
			</div>
		);
	}
}