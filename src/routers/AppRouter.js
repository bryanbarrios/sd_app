import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicRoute } from '../components/PublicRoute';
import { PrivateRoute } from '../components/PrivateRoute';
import { LoginScreen } from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ElectionsScreen from '../screens/ElectionsScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { VerificationScreen } from '../screens/VerificationScreen';

export const AppRouter = () => {
	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						exact
						path="/"
						isAuthenticated={false}
						restricted={false}
						component={HomeScreen}
					/>
					<PublicRoute
						exact
						path="/elections"
						isAuthenticated={false}
						restricted={false}
						component={ElectionsScreen}
					/>
					<PublicRoute
						exact
						path="/login"
						isAuthenticated={false}
						restricted={false}
						component={LoginScreen}
					/>
					<PublicRoute
						exact
						path="/verification"
						isAuthenticated={false}
						restricted={false}
						component={VerificationScreen}
					/>
					<PrivateRoute
						path="/dashboard"
						isAuthenticated={false}
						component={DashboardRoutes}
					/>
					<Route path="*" component={NotFoundScreen} />
				</Switch>
			</div>
		</Router>
	);
};
