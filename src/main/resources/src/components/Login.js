import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-layout">
        <div >
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="box-layout__title">Войти</h1>
              <p className="text-xs-center">
                <Link to="/register">
                  Нужен аккаунт?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form className="input-group" onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="input-group__item">
                    <input
                      className="text-input"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="input-group__item">
                    <input
                      className="text-input"
                      type="password"
                      placeholder="Пароль"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="button"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Войти
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
