import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator } from '../../../utils/validators/validators';
import { FormElement } from '../../common/FormsControls/FormsControls';


const MyPosts = React.memo(props => {
  const postsElements = props.posts.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

  const onAddPost = (formData) => {
    props.addNewPost(formData.newPost)
    
  }

  return (
    <div className={s.posts}>
      <b className={s.myPostsTitle}>My posts</b>
      <AddPostReduxForm onSubmit={onAddPost} />
      <div>
        {postsElements}
      </div>
    </div>
  )
});

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >
      <div>
        <Field className={s.postInput} component={FormElement} element='textarea' name='newPost' placeholder='Type new post...' />
      </div>
      <div>
        <button className={s.addPostBtn}>Add</button>
      </div>
    </form>
  )
}

const AddPostReduxForm = reduxForm({ form: 'addPostForm' })(AddPostForm)

export default MyPosts;