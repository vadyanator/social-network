import React from 'react';
import s from './Users.module.css';
import avatar from '../../assets/images/avatar.jpg';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';

const Users = ({ usersAmount, usersOnPage, pagesCount, onPageChanged, currentPage, ...props }) => {

    return (
        <div className={s.users}>
            <Paginator
                usersAmount={usersAmount}
                usersOnPage={usersOnPage}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />

            {props.users.map(u => <User
                user={u}
                toggleFollowingInProgress={props.toggleFollowingInProgress}
                follow={props.follow}
                unfollow={props.unfollow}
            />
            )}
        </div>
    )
}

export default Users;