import {Link} from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
  onChangePassword: value =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
  onChangeUsername: value =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({type: REGISTER, payload})
  },
  onUnload: () =>
    dispatch({type: REGISTER_PAGE_UNLOADED})
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="auth-layout">

        <div>
          <h1 className="box-layout__title">Зарегистрироваться</h1>
          <p>
            <Link to="/login">
              Уже есть аккаунт?
            </Link>
          </p>

          <ListErrors errors={this.props.errors}/>

          <form className="input-group" onSubmit={this.submitForm(username, email, password)}>
            <fieldset>

              <fieldset className="input-group__item">
                <input
                  className="text-input"
                  type="text"
                  placeholder="Имя пользователя"
                  value={this.props.username}
                  onChange={this.changeUsername}/>
              </fieldset>

              <fieldset className="input-group__item">
                <input
                  className="text-input"
                  type="email"
                  placeholder="Email"
                  value={this.props.email}
                  onChange={this.changeEmail}/>
              </fieldset>

              <fieldset className="input-group__item">
                <input
                  className="text-input"
                  type="password"
                  placeholder="Пароль"
                  value={this.props.password}
                  onChange={this.changePassword}/>
              </fieldset>

              <button
                className="button"
                type="submit"
                disabled={this.props.inProgress}>
                Зарегистрироваться
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
