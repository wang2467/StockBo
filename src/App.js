import React from "react";
import {Switch, Route} from "react-router-dom";
import WatchList from "./components/WatchList.js";
import WatchTest from "./components/WatchTest.js";


export default class App extends React.Component {
	render(){
		return (
			<Switch>
				<Route exact path="/watch" component={WatchList}/>
				<Route path="/watch/:symbol" component={WatchTest}/>
			</Switch>
		);
	}
}