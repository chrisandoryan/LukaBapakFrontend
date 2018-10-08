import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './routes';
import Dashboard from './components/dashboard/Dashboard';
import "./css/lapak.css";
import "./css/helep.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthed: false,
			user: {}
		};
	}

	componentDidMount() {
		let state = localStorage["appState"];
		if (state) {
		  let AppState = JSON.parse(state);
		  console.log(AppState);
		  this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
		}
	}
	render() {
		return (			
		<Router>
			<div>
			{routes.map(route => (
				<Route exact path={route.path} component={route.component} />
			))}
			</div>
		</Router>
		);
	}
}

export default App;
