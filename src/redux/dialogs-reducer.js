const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';

const initialState = {
    dialogs: [
        
    ],
    messages: [

    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_NEW_MESSAGE:
            let message = {
                id: 4,
                message: action.newMessage,
            };

            return {
                ...state,
                messages: [...state.messages, message],
            };
        default: return state;
    }
}

export const sendNewMessage = (newMessage) => ({ type: SEND_NEW_MESSAGE, newMessage });

export default dialogsReducer;