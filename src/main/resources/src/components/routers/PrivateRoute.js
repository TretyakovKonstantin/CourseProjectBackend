import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header  />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/auth" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: state.common.currentUser
});

export default connect(mapStateToProps)(PrivateRoute);
