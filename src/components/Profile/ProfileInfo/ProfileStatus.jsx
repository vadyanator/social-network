import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    profileStatus: this.props.profileStatus
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profileStatus !== this.props.profileStatus) {
      this.setState({
        profileStatus: this.props.profileStatus
      })
    }
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    })

    this.props.updateProfileStatus(this.state.profileStatus)
  }

  onChangeStatus = (e) => {
    this.setState({
      profileStatus: e.currentTarget.value
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>
              <b>Status:</b>{this.props.profileStatus}
            </span>
          </div>
        }

        {this.state.editMode &&
          <div>
            <input onChange={this.onChangeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.profileStatus} />
          </div>
        }
      </div>
    )
  }

}

export default ProfileStatus;