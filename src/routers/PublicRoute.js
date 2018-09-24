import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest // will contain the rest of the props not destructured
}) => (
  <Route {...rest} component={(props)=> (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props}/>
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid // !! => go from either string or undefined to a bool val
});

export default connect(mapStateToProps)(PublicRoute);