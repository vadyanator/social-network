import React from 'react';
import Dialogs from './Dialogs';
import { sendNewMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsData,
    }
}

export default compose(
    connect(mapStateToProps, {sendNewMessage}),
    withAuthRedirect
)(Dialogs);