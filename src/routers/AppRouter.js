import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { PublicRoute } from '../components/PublicRoute';
import { PrivateRoute } from '../components/PrivateRoute';
import { Navbar } from '../components/Navbar';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ElectionsScreen } from '../screens/ElectionsScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { NotFoundScreen } from '../screens/NotFoundScreen';

export const AppRouter = () => {
	return (
		<Router>
			<Navbar />
			<div className="container mx-auto px-4 py-6">
				<Switch>
					<PublicRoute
						exact
						path="/"
						isAuthenticated={false}
						restrict-ed={false}
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
					<PrivateRoute
						path="/dashboard"
						isAuthenticated={true}
						component={DashboardRoutes}
					/>
					<Route path="*" component={NotFoundScreen} />
				</Switch>
			</div>
		</Router>
	);
};
