import React from 'react';
import ProfileInfo from './ProfileInfo';
import { connect } from 'react-redux';
import { getUserProfile, getProfileStatus, updateProfileStatus, updateAvatar, updateProfileData } from '../../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileInfoContainer extends React.Component {

  resetProfile() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }

    this.props.getUserProfile(userId)
    this.props.getProfileStatus(userId)
  }

  componentDidMount() {
    this.resetProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.resetProfile()
    }
  }

  render() {
    return <ProfileInfo {...this.props} isOwner={!this.props.match.params.userId} />
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profileData.userProfile,
    profileStatus: state.profileData.profileStatus,
    userId: state.authData.id,
    isAuth: state.authData.isAuth,
  }
}

export default compose(
  connect(mapStateToProps, { getUserProfile, getProfileStatus, updateProfileStatus, updateAvatar, updateProfileData }),
  withRouter,
)(ProfileInfoContainer)