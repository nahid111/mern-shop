import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../NotFound';
import Home from '../Home.jsx';
import Dashboard from '../Dashboard';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../Alert';
import Profile from '../Profile.jsx';
import ForgotPassword from '../auth/ForgotPassword.jsx';
import ResetPassword from '../auth/ResetPassword.jsx';
import VerifyEmail from '../auth/VerifyEmail.jsx';
import Categories from '../Categories.jsx';
import Products from '../products/Products.jsx';


const Routes = props => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/verify-email/:token" component={VerifyEmail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <Route exact path="/products" component={Products} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
