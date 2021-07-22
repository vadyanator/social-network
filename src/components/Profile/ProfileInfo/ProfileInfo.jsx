import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import defaultAvatar from '../../../assets/images/avatar.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import EditProfileReduxForm from './EditProfileForm/EditProfileForm';


const ProfileInfo = ({ userProfile, profileStatus, updateProfileStatus, isOwner, updateAvatar, updateProfileData }) => {
  if (!userProfile) {
    return <Preloader />
  }

  let avatar = userProfile.photos.large;
  let [editMode, setEditMode] = useState(false);

  const onUpdateAvatar = (e) => {
    if (e.target.files.length) {
      updateAvatar(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    updateProfileData(formData).then(() => setEditMode(false))
  }

  return (
    <div className={s.profile}>
      <div className={s.description}>
        <img src={avatar ? avatar : defaultAvatar} />
        {isOwner &&
          <div>
            <label for='upload-avatar' className={s.addFileLabel}>
              <svg class={s.uploadFileIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M286 384h-80c-14.2 1-23-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c11.6 11.6 3.7 33.1-13.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-23-23V366c0-13.3 10.7-24 24-24h136v8c0 31 24.3 56 56 56h80c30.9 0 55-26.1 57-55v-8h135c13.3 0 24 10.6 24 24zm-124 88c0-11-9-20-19-20s-19 9-20 20 9 19 20 20 21-9 20-20zm64 0c0-12-9-20-20-20s-20 9-19 20 9 20 20 20 21-9 20-20z">
                </path>
              </svg>
              <span class={s.uploadFileText}>Choose file</span>
            </label>
            <input id='upload-avatar' accept=".jpg, .jpeg, .png, .gif, .bmp, .doc, .docx, .xls, .xlsx, .txt, .tar, .zip, .7z, .7zip"
              className={s.addFileBtn} type='file' onChange={onUpdateAvatar} />
          </div>
        }
      </div>
      <div className={s.profileInfo}>
        <ProfileStatusWithHooks profileStatus={profileStatus} updateProfileStatus={updateProfileStatus} />
        {editMode
          ? <EditProfileReduxForm initialValues={userProfile} onSubmit={onSubmit} userProfile={userProfile} isOwner={isOwner} setEditMode={setEditMode} />
          : <ProfileData userProfile={userProfile} isOwner={isOwner} setEditMode={setEditMode} />
        }
      </div>
    </div>
  )
}

const ProfileData = ({ userProfile, isOwner, setEditMode }) => {
  return (
    <div>
      {isOwner && <button className={s.profileEditBtn} onClick={() => setEditMode(true)}>Edit</button>}
      <div>
        <b>Full name:</b> {userProfile.fullName || '---'}
      </div>
      <div>
        <b>Looking for a job:</b> {userProfile.lookingForAJob ? 'yes' : 'no'}
      </div>
      <div>
        <b>Looking for a job description:</b> {userProfile.lookingForAJobDescription || '---'}
      </div>
      <div>
        <b>About me:</b> {userProfile.aboutMe || '---'}
      </div>
      <Contacts contacts={userProfile.contacts} />
    </div>
  )
}

export const Contacts = ({ contacts }) => {
  return (
    <div className={s.contacts}>
      {Object.keys(contacts).map(key => {
        return <Contact key={key} name={key} value={contacts[key]} />
      })}
    </div>
  )
}

const Contact = ({ key, name, value }) => {
  return (
    <div>
      <b>{name}:</b> {value || '---'}
    </div>
  )
}

export default ProfileInfo;