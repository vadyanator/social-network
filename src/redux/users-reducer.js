import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_AMOUNT = 'SET_USERS_AMOUNT';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_TOGGLE_FOLLOWING_IN_PROGRESS = 'SET_TOGGLE_FOLLOWING_IN_PROGRESS';

const initialState = {
    users: [],
    usersAmount: 100,
    usersOnPage: 5,
    currentPage: 1,
    isLoading: false,
    toggleFollowingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_USERS_AMOUNT:
            return {
                ...state,
                usersAmount: action.usersAmount
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                toggleFollowingInProgress: action.isLoading
                    ? [...state.toggleFollowingInProgress, action.userId]
                    : state.toggleFollowingInProgress.filter(userId => userId != action.userId)
            };

        default: return state;
    }
}

export const setFollow = (userId) => ({ type: FOLLOW, userId });
export const setUnfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersAmount = (usersAmount) => ({ type: SET_USERS_AMOUNT, usersAmount });
export const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
export const setToggleFollowingInProgress = (isLoading, userId) => ({ type: SET_TOGGLE_FOLLOWING_IN_PROGRESS, isLoading, userId });

export const getUsers = (currentPage, usersOnPage) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        usersAPI.getUsers(currentPage, usersOnPage)
            .then(data => {
                dispatch(setIsLoading(false));
                dispatch(setUsers(data.items));
                dispatch(setUsersAmount(data.totalCount));
            })
    }
}

const toggleFollow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setToggleFollowingInProgress(true, userId))
    let resultCode = await apiMethod(userId)

    if (resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(setToggleFollowingInProgress(false, userId))
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        dispatch(setToggleFollowingInProgress(true, userId))
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = setUnfollow

        toggleFollow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(setToggleFollowingInProgress(true, userId))
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator = setFollow

        toggleFollow(dispatch, userId, apiMethod, actionCreator)
    }
}

export default usersReducer;