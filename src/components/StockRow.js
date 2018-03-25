import React from "react";

const URL_default = "https://api.iextrading.com/1.0";

export default class StockRow extends React.Component {
	state = {
		price:undefined,
		low:undefined,
		high:undefined,
		open:undefined,
		close:undefined,
		prev:undefined,
		change:undefined
	};

	unWatch = (e) => {
		this.props.removeTicker(e, this.props.symbol);
	}

	componentDidMount(){
		this.StockId = setInterval(async () => {
				const data = await fetch(URL_default+`/stock/${this.props.symbol}/quote`).then((response) => {
						return response.json().then((data) => {
							return data;
						}).catch((err) => {
							console.log("Json parse Error");
						})
					}).catch((err) =>{
						console.log("Network Error");
					});
				const data2 = await fetch(URL_default+`/stock/${this.props.symbol}/price`).then((response) => {
						return response.json().then((data) => {
							return data;
						}).catch((err) => {
							console.log("Json parse Error");
						})
					}).catch((err) =>{
						console.log("Network Error");
					});
				if (this.state.prev === undefined){
					this.setState({
						price:data2,
						low:data.low,
						high:data.high,
						open:data.open,
						close:data.close,
						prev:data2,
						change:undefined
					});
				} else{
					const prev_p = this.state.prev;
					this.setState({
						price:data2,
						low:data.low,
						high:data.high,
						open:data.open,
						close:data.close,
						prev:data2,
					});
					if (data2 !== prev_p){
						this.setState({
							change:Number((data2-data.close)*100/data.close).toFixed(2).toString()+"%"
						});
					}
				}
			}
		,1000);
	}

	componentWillUnmount(){
		clearInterval(this.StockId);
	}


	render(){
		var priceClass = '';
		var iconClass = '';
		var changeClass = '';
		if(this.state.change !== undefined){
			if (Number(this.state.change.slice(0,-1)) > 0){
				iconClass = 'glyphicon glyphicon-triangle-top';
				priceClass = 'price-positive';
				changeClass = 'change-positive';
			} else if (Number(this.state.change.slice(0,-1)) < 0){
				iconClass = 'glyphicon glyphicon-triangle-bottom';
				priceClass = 'price-negative';
				changeClass = 'change-negative';
			}
		}

		return (
			<tr>
				{this.props.symbol && <td>{this.props.symbol.toUpperCase()}</td>}
				<td className={priceClass}>{this.state.price}</td>
				<td className={changeClass}>
					{this.state.change} 
					<span className={iconClass}></span>
				</td>
				<td>{this.state.low}</td>
				<td>{this.state.high}</td>
				<td>{this.state.open}</td>
				<td>{this.state.close}</td>
				<td>
					<button className="btn btn-default btn-sm" onClick={this.unWatch}>
						<span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>Unwatch
					</button>
				</td>
			</tr>
		);
	}
}