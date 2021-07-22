import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.authData,
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }

        default: return state;
    }
}

export const setAuthData = (id, email, login, isAuth) => ({ type: SET_AUTH_DATA, authData: { id, email, login, isAuth } });
export const setCaptcha = (captchaUrl) => ({ type: SET_CAPTCHA, captchaUrl });

export const getAuth = () => {
    return async (dispatch) => {
        const data = await authAPI.getAuth()

        if (data.resultCode === 0) {
            const { id, email, login } = data.data;
            dispatch(setAuthData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuth())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }

        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url

    dispatch(setCaptcha(captchaUrl))
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false))
    }
}


export default authReducer;