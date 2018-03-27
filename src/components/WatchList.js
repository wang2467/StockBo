import React from "react";
import Titles from "./Titles.js";
import Form from "./Form.js";
import StockTable from "./StockTable.js";
import SignUp from "./SignUp.js";

import ChatList from "./ChatList.js";
import ChatForm from "./ChatForm.js";

import {Link} from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import RaisedButton from "material-ui/RaisedButton";

import {database} from "../firebase.js";

/* state structure
	state = {
				symbols:{
					"aapl":"aapl",
					"fb":"fb",
					"anet":"anet"
				}	
			}
*/

const URL_default = "https://api.iextrading.com/1.0";

export default class WatchList extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {symbols:undefined, messages:[]}
		this.symbols = {}
	}
	
	addTicker = (e) => {
		e.preventDefault();
		if (localStorage.getItem('apiToken') !== null){
			const s = e.target.elements.symbol.value;
			e.target.elements.symbol.value = '';
			fetch(URL_default+`/stock/${s}/quote`).then((response)=>{
				if (response.ok){
					console.log(s);
					this.symbols[s] = s;
					let child = `/${localStorage.getItem('username').replace(/@|\./g, '-')}`;
					let updateVal = {}
					updateVal[child] = Object.keys(this.symbols).join(',');
					database.ref().update(updateVal);
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
		let child = `/${localStorage.getItem('username').replace(/@|\./g, '-')}`;
		let updateVal = {}
		updateVal[child] = Object.keys(this.symbols).join(',');
		database.ref().update(updateVal);
		this.setState({
			symbols:this.symbols
		});
	}

	addMessages = (e) => {
		e.preventDefault()
		this.connection.send(e.target.elements.message.value)
	}

	componentDidMount(){
		if (localStorage.getItem('apiToken')){
			database.ref(localStorage.getItem('username').replace(/@|\./g, '-')).once('value', (snapshot) => {
				snapshot.val().split(',').forEach((i) => {
					if (i !== ''){
						this.symbols[i] = i;
					}
				})
				this.setState ({
					symbols:this.symbols
				});
			});
		}

		this.connection = new WebSocket("ws://localhost:8000/chat")
		this.connection.onmessage = (evt) => {
			this.setState({
				message:this.state.messages.push(evt.data)
			});
		}
	}


	render(){
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					<AppBar title="StockBo" />
					{!localStorage.getItem('apiToken') && 
					<div>
						<Link to="/login">
							<RaisedButton>Login</RaisedButton>
						</Link>
						<Link to="/signup">
							<RaisedButton>SignUp</RaisedButton>
						</Link>
					</div>}
					{localStorage.getItem('apiToken') && 
					<Link to="/logout">
						<RaisedButton className="logButton">Logout</RaisedButton>
					</Link>}
					<Form addTicker={this.addTicker}/>
					<StockTable symbols={this.state.symbols} removeTicker={this.removeTicker}/>
					<ChatList messages={this.state.messages}/>
					<ChatForm addMessages={this.addMessages}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

