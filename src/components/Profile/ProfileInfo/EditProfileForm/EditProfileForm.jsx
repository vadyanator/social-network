import React from 'react';
import { reduxForm } from 'redux-form';
import { createField } from '../../../common/FormsControls/FormsControls';
import s from '../../../common/FormsControls/FormsControls.module.css'

const EditProfileForm = ({ userProfile, isOwner, setEditMode, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} >
            <button className={s.saveProfileInfo}>Save</button>
            <div>
                <b>Full name:</b>{createField([], 'fullName', 'Full name', null, 'input')}
            </div>
            <div>
                <b>Looking for a job:</b>{createField([], 'lookingForAJob', 'Looking for a job', { type: 'checkbox' }, 'input')}
            </div>
            <div>
                <b>Looking for a job description:</b>{createField([], 'lookingForAJobDescription', 'Looking for a job description', null, 'textarea')}
            </div>
            <div>
                <b>About me:</b>{createField([], 'aboutMe', 'About me', null, 'textarea')}
            </div>
            <div>
                <b>Contacts:</b> 
                {Object.keys(userProfile.contacts).map(key => {
                    return (
                        <div>
                            <b>{key}:</b> {createField([], 'contacts.' + key, key, null, 'input')}
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const EditProfileReduxForm = reduxForm({ form: 'editProfile' })(EditProfileForm)

export default EditProfileReduxForm;