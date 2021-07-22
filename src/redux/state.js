import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';

const store = {
    _state: {
        dialogsData: {
            dialogs: [
                { id: 1, name: 'Vadya' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Misha' },
                { id: 4, name: 'Sveta' },
                { id: 5, name: 'Sasha' },
                { id: 6, name: 'Alexandr' },
            ],
            messages: [
                { id: 1, message: 'i am pidor' },
                { id: 2, message: 'i am loh' },
                { id: 3, message: 'i am gandon' },
            ],
            newMessage: ''
        },

        profileData: {
            posts: [
                { id: 1, message: 'How are you?', likesCount: 0 },
                { id: 2, message: 'What you doing?', likesCount: 4 },
                { id: 3, message: 'I am gay', likesCount: 8 },
            ],
            newPost: ''
        }
    },

    getState() {
        return this._state;
    },

    _callSubscriber() {},

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.dialogsData = dialogsReducer(this._state.dialogsData, action);
        this._state.profileData = profileReducer(this._state.profileData, action);

        this._callSubscriber();
    },
}

export default store;