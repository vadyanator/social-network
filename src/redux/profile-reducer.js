import { profileAPI } from '../api/api';
import { stopSubmit } from "redux-form";

const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';
const SET_AVATAR = 'SET_AVATAR';

const initialState = {
    posts: [
        
    ],
    userProfile: null,
    profileStatus: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_POST:
            let post = {
                id: 4,
                message: action.newPost,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, post],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            };
        case SET_PROFILE_STATUS:
            return {
                ...state,
                profileStatus: action.profileStatus,
            };
        case SET_AVATAR:
            return {
                ...state,
                userProfile: { ...state.userProfile, photos: action.photos },
            };
        default: return state;
    }
}


export const addNewPost = (newPost) => ({ type: ADD_NEW_POST, newPost });
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile });
export const setProfileStatus = (profileStatus) => ({ type: SET_PROFILE_STATUS, profileStatus });
export const setAvatar = (photos) => ({ type: SET_AVATAR, photos })

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getUser(userId)
        dispatch(setUserProfile(data));
    }
}

export const getProfileStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(response.data))
    }
}

export const updateProfileStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateProfileStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setProfileStatus(status))
        }
    }
}

export const updateAvatar = (avatar) => {
    return async (dispatch) => {
        let response = await profileAPI.updateAvatar(avatar)

        if (response.data.resultCode === 0) {
            dispatch(setAvatar(response.data.data.photos))
        }
    }
}

export const updateProfileData = (formData) => {
    return async (dispatch, getState) => {
        const userId = getState().authData.id;
        const response = await profileAPI.updateProfileData(formData);

        if (response.data.resultCode === 0) {

            dispatch(getUserProfile(userId))
        } else {
            let contactsNames = response.data.messages.map(m => m.split('->').reverse()[0].slice(0, -1).toLowerCase());
            let contacts = {};

            contactsNames.map( (contact, i) => {
               contacts[contact] = response.data.messages[i]
            })

            dispatch(stopSubmit('editProfile', { 'contacts': contacts }))
            return Promise.reject(response.data.messages)
        }
    }
}

export default profileReducer;
