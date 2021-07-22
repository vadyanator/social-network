import React from 'react';
import s from './User.module.css';
import avatar from '../../../assets/images/avatar.jpg';
import { NavLink } from 'react-router-dom';

const User = ({ user, toggleFollowingInProgress, follow, unfollow }) => {

    return (
        <div className={s.userContainer} >
            <div className={s.followedWrapper} >
                <div className={s.userName}>{user.name}</div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : avatar} alt="" className={s.avatar} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button className={s.followBtn} disabled={toggleFollowingInProgress.some(userId => userId == user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }} >Unfollow</button>
                        : <button className={s.followBtn} disabled={toggleFollowingInProgress.some(userId => userId == user.id)}
                            onClick={() => {
                                follow(user.id)
                            }} >Follow</button>
                    }
                </div>
            </div>
            {/* <div className={s.userInfo} >
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div> */}
        </div>
    )
}

export default User;