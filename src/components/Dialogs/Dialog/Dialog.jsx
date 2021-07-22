import React from 'react';
import s from './Dialog.module.css';
import { NavLink } from 'react-router-dom';

const Dialog = (props) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className='dialog'>
            <NavLink to={path} className={s.dialogItem}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog;