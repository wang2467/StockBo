import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

export default class WatchTest extends React.Component {
	render(){
		console.log(this.props.match.params);
		return(
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					<h1>This is a test {this.props.match.params.symbol}</h1>
				</div>
			</MuiThemeProvider>
		);
	}
}