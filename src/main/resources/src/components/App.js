import agent from '../agent';
import React from 'react';
import {connect} from 'react-redux';
import {APP_LOAD, REDIRECT} from '../constants/actionTypes';
import {Switch} from 'react-router-dom';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Settings from '../components/Settings';
import {store} from '../store';
import {push} from 'react-router-redux';
import Groups from '../components/groups/Groups'
import PersonalCabinet from '../components/personal/PersonalCabinet'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from '../components/routers/PrivateRoute';
import PublicRoute from '../components/routers/PublicRoute';
import {NonAuthPage} from "./NonAuthPage";
import HomePage from './HomePage';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({type: REDIRECT})
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Switch>
            <PublicRoute exact path="/auth" component={NonAuthPage}/>
            <PublicRoute path="/login" component={Login}/>
            <PublicRoute path="/register" component={Register}/>
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute path="/settings" component={Settings}/>
            <PrivateRoute path="/@:username" component={Profile}/>
            <PrivateRoute path="/groups" component={Groups}/>
            <PrivateRoute path="/personal" component={PersonalCabinet}/>
            <PublicRoute component={NotFoundPage}/>
          </Switch>
        </div>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
