import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { FormElement } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = (props) => {
    
    const dialogsElements = props.dialogs.dialogs.map(d => <Dialog name={d.name} id={d.id} />);
    const messagesElements = props.dialogs.messages.map(m => <Message message={m.message} id={m.id} />);

    const onSubmit = (formData) => {
        props.sendNewMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>
            <div className='dialogs_items'>
                {dialogsElements}
            </div>
            <div className='Messages'>
                {messagesElements}
            </div>
            <SendMessageReduxForm onSubmit={onSubmit} />
        </div>
    )
}

let maxLength = maxLengthCreator(10)

const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field name='message' validate={[required, maxLength]} component={FormElement} element='textarea' placeholder='Type new message...' />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const SendMessageReduxForm = reduxForm({ form: 'sendMessage' })(SendMessageForm)

export default Dialogs;