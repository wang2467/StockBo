import React from "react";
import {Switch, Route, Redirect, Router} from "react-router-dom";

import WatchList from "./components/WatchList.js";
import WatchTest from "./components/WatchTest.js";
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import SignUp from "./components/SignUp.js";

import createBrowserHistory from "history/createBrowserHistory";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

import SocketIOClient from "socket.io-client";

const customHistory = createBrowserHistory();

function PrivateRoute({component:Component, ...rest}){
	return (
			<Route 
			{...rest}
			render={(props) => localStorage.getItem('apiToken') !== null
			 	?<WatchList {...props}/>
				:<Redirect to={
								{pathname:'/login'}
							}/>
				}
			/>
		);
}

export default class App extends React.Component {

	componentWillMount(){
		this.socket = SocketIOClient("127.0.0.1:4001")
		this.state = {
			socket:this.socket
		}
	}

	componentWillUnmount(){
		this.socket.emit('disconnect');
	}

	render(){

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<Router history={customHistory}>
					<Switch>
						<Route exact path="/watch" component={WatchList} />
						<Route path="/watch/:symbol" component={WatchTest}/>
						<Route path="/login" render={(props) => <Login {...props}/>}/>
						<Route path="/logout" component={Logout}/>
						<Route path="/signup" render={(props)=> <SignUp {...props}/>}/>
					</Switch>
				</Router>
			</MuiThemeProvider>
		);
	}
}