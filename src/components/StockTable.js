import React from "react";
import StockRow from "./StockRow.js";

export default class StockTable extends React.Component {
	unwatch = (e) => {
		e.preventDefault();
	}


	render(){
		var items = [];
		for (var s in this.props.symbols){
			items.push(<StockRow key={this.props.symbols[s]} symbol={this.props.symbols[s]} removeTicker={this.props.removeTicker}/>)
		}
		return(
			<div>
				<table>
					<thead>
						<tr>
							<th>Symbol</th>
							<th>Price</th>
							<th>Change</th>
							<th>Low</th>
							<th>High</th>
							<th>Open</th>
							<th>Close</th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</table>
			</div>
		);
	}
}