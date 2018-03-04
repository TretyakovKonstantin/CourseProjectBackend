import React from 'react';
import {Link} from 'react-router-dom';
import {LOGOUT} from "../constants/actionTypes";
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    currentUser: state.common.currentUser
  }
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({type: LOGOUT})
});

const LoggedInView = props => {
  if (props.currentUser) {
    return (

      <header className="header show-for-tablet">
        <div className="content-container">
          <div className="header__title">
            <Link className="header__title" to="/">
              <button className="button button--link"><i className="ion-ios-home"/>&nbsp;Hogwarts</button>
            </Link>
            <Link className="header__title" to="/groups">
              <button className="button button--link"><i className="ion-person-stalker"/>&nbsp;Группы</button>
            </Link>
            <Link className="header__title" to={`/personal/@${props.currentUser.username}`}>
              <button className="button button--link"><i className="ion-person"/>&nbsp;Личный кабинет</button>
            </Link>
            <Link className="header__title" to="/settings">
              <button className="button button--link"><i className="ion-gear-a"/>&nbsp;Настройки</button>
            </Link>
            <button className="button button--link" onClick={props.onClickLogout}><i className="ion-android-exit"/> Выйти</button>
          </div>
        </div>
      </header>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    if (!this.props.currentUser) {
      return null
    }
    return (
        <nav>
          <LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout}/>
        </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);