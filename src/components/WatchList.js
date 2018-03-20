import React from "react";
import Titles from "./Titles.js";
import Form from "./Form.js";
import StockTable from "./StockTable.js";


export default class WatchList extends React.Component {
	state = {
		symbols:undefined
	}

	symbols = {};
	
	addTicker = (e) => {
		e.preventDefault();
		const s = e.target.elements.symbol.value;
		this.symbols[s] = s;
		this.setState({
			symbols:this.symbols
		});
	}

	removeTicker = (e, stock) => {
		e.preventDefault();
		delete this.symbols[stock];
		this.setState({
			symbols:this.symbols
		});
	}


	render(){
		return (
			<div>
				<Titles />
				<Form addTicker={this.addTicker}/>
				<StockTable symbols={this.state.symbols} removeTicker={this.removeTicker}/>
			</div>
		);
	}
}

