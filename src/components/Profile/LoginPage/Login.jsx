import React from 'react';
import { connect } from 'react-redux';
import { Field,reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, FormElement } from '../../common/FormsControls/FormsControls';
import { login } from '../../../redux/auth-reducer'
import { Redirect } from 'react-router-dom';
import s from '../../common/FormsControls/FormsControls.module.css'

const Login = ({ login, isAuth, captchaUrl }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha )
    }

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div className={s.loginPage}>
            <h1>LOGIN</h1>
            <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
        </div>
    )
}

let maxLength = maxLengthCreator(50)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit} >
            <b>Email</b>
            {createField([required, maxLength], 'email', 'Email', null, 'input')}
            <b>Password</b>
            {createField([required, maxLength], 'password', 'Password', {type: 'password'}, 'input')}
            <b>Remember me</b>
            {createField([], 'rememberMe', null, {type: 'checkbox'}, 'input')}
            
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField([], 'captcha', 'Input word from picture', null , 'input')}

            { error &&
                <div className={s.formCommonError}>
                    {error}
                </div>
            }
            <div>
                <button className={s.loginBtn}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.authData.isAuth,
    captchaUrl: state.authData.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);