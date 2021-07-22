import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div>
      <img className={s.img} src='https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg' />  
      <span>{props.message}</span>
      <span>likes: {props.likes}</span>
    </div>
  );
}

export default Post;