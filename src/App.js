import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavbarComponent } from './components';
import { Home, Sukses, CheckOut } from './pages';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<NavbarComponent />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/sukses" component={Sukses} />
					<Route path={'/checkout'} component={CheckOut} />
				</Switch>
			</BrowserRouter>
		);
	}
}
