import React from 'react';
import {Link} from 'react-router-dom';
import agent from '../agent';
import {connect} from 'react-redux';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"/> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: PROFILE_PAGE_LOADED, payload}),
  onUnload: () => dispatch({type: PROFILE_PAGE_UNLOADED})
});

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.currentUser.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="personal-info">
        <img className="personal-image" src={profile.image} alt={profile.username}/>
        <h4>{profile.username}</h4>
        <p>{profile.bio}</p>

        <EditProfileSettings isUser={isUser}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export {Profile, mapStateToProps};
