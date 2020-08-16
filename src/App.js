import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './pages/HomePage';
import CountdownPage from './pages/CountdownPage';
import ChordPage from './pages/ChordPage';
import { FinishedPage } from './pages/FinishedPage';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			topLevel: 'from-the-top',
		}
	}

	render() {
		return (
			<Router>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/CountdownPage" component={CountdownPage} />
				<Route exact path="/ChordPage" component={ChordPage} />
				<Route exact path="/FinishedPage" component={FinishedPage} />
			</Router>
		);
	}
}

export default App;
