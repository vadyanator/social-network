import React from 'react';
import { Field } from 'redux-form';
import s from './FormsControls.module.css';

export const FormElement = ({ input, meta, ...props }) => {
    let hasError = meta.touched && meta.error;
    return (
        <div >
            <div>
                {(props.element === 'input') &&
                    <input {...input} {...props} className={hasError ? s.error : ''} />
                }
                {(props.element === 'textarea') &&
                    <textarea {...input} {...props} className={hasError ? s.error : ''} />
                }
            </div>
            <div>
                {hasError ? <span className={s.errorText} >{meta.error}</span> : ''}
            </div>
        </div>
    )
}

export const createField = (validators, name, placeholder, props, element) => (
    <div>
        <Field
            validate={validators}
            name={name}
            placeholder={placeholder}
            component={FormElement}
            element={element}
            {...props}
        />
    </div>
)

