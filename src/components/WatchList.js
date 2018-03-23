import React from "react";
import Titles from "./Titles.js";
import Form from "./Form.js";
import StockTable from "./StockTable.js";
import {Link} from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import RaisedButton from "material-ui/RaisedButton";
import {database} from "../firebase.js";


const URL_default = "https://api.iextrading.com/1.0";

export default class WatchList extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {symbols:undefined}
		this.symbols = {}
		if (localStorage.getItem('apiToken')){
			database.ref(localStorage.getItem('username').replace(/@|\./g, '-')).once('value', (snapshot) => {
				snapshot.val().split(',').forEach((i) => {
					this.symbols[i] = i;
				})
				this.setState ({
					symbols:this.symbols
				});
			});
		}
	}
	
	addTicker = (e) => {
		e.preventDefault();
		if (localStorage.getItem('apiToken') !== null){
			const s = e.target.elements.symbol.value;
			e.target.elements.symbol.value = '';
			fetch(URL_default+`/stock/${s}/quote`).then((response)=>{
				if (response.ok){
					this.symbols[s] = s;
					database.ref().update({'/wang2467-purdue-edu': Object.keys(this.symbols).join(',')});
					this.setState({
						symbols:this.symbols
					});
				} else {
					alert("The Ticker symbol does not exist");
				}
			}).catch((error) => {
				console.log(error);
			})
		} else {
			alert('You need to sign in to add Tickers');
		}
	}

	removeTicker = (e, stock) => {
		e.preventDefault();
		delete this.symbols[stock];
		database.ref().update({'/wang2467-purdue-edu': Object.keys(this.symbols).join(',')});
		this.setState({
			symbols:this.symbols
		});
	}

	componentWillMount(){
	}


	render(){
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					<AppBar title="StockBo" />
					{!localStorage.getItem('apiToken') && 
					<Link to="/login">
						<RaisedButton>Login</RaisedButton>
					</Link>}
					{localStorage.getItem('apiToken') && 
					<Link to="/logout">
						<RaisedButton className="logButton">Logout</RaisedButton>
					</Link>}
					<Form addTicker={this.addTicker}/>
					<StockTable symbols={this.state.symbols} removeTicker={this.removeTicker}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

