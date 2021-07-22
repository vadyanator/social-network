import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

let state = combineReducers({
    dialogsData: dialogsReducer,
    profileData: profileReducer,
    usersData: usersReducer,
    authData: authReducer,
    form: formReducer,
    app: appReducer
})

let store = createStore(state, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;