import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { Redirect } from 'react-router-dom';

const Header = (props) => {

    if (!props.isAuth) {
        return <Redirect to='/login' />
    }

    return (
        <header className={s.header}>
            <div className={s.headerContainer}>
                <img className={s.logo} src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/social-media-expert-logo-instagram-square-ad-design-template-7f9ba2faa67581b4d0ac4847bba435a2_screen.jpg?ts=1589933896' />
                
                <div className={s.authTitle}>
                    {props.isAuth ? 
                    <div><span className={s.login} >{props.login}</span> <button className={s.loginButton} onClick={props.logout} >Log out</button></div> : 
                    <NavLink to={'/login'}>Login</NavLink>}
                </div>

            </div>
        </header>
    )
}

export default Header;