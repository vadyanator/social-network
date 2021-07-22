import React, { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [profileStatus, setProfileStatus] = useState(props.profileStatus);

  useEffect(() => {
    setProfileStatus(props.profileStatus)
  }, [props.profileStatus])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateProfileStatus(profileStatus)
  }

  const onChangeStatus = (e) => {
    setProfileStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode}>
            <b>Status: </b>{props.profileStatus}
          </span>
        </div>
      }

      {editMode &&
        <div>
          <b>Status: </b><input value={profileStatus} onChange={onChangeStatus} onBlur={deactivateEditMode} autoFocus={true} />
        </div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks;