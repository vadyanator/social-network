import profileReducer, { addNewPost, setProfileStatus, setUserProfile } from "./profile-reducer"

let state = {
    posts: [
        { id: 1, message: 'How are you?', likesCount: 0 },
        { id: 2, message: 'What you doing?', likesCount: 4 },
        { id: 3, message: 'I am gay', likesCount: 8 },
    ],
    userProfile: null,
    profileStatus: ''
}

it('post should be added', () => {
    let action = addNewPost('new post');
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})

it('profile should be added', () => {
    let action = setUserProfile('user profile');
    let newState = profileReducer(state, action)
    expect(newState.userProfile).toBe('user profile')
})

it('profile status should be set', () => {
    let action = setProfileStatus('profile status');
    let newState = profileReducer(state, action)
    expect(newState.profileStatus).toBe('profile status')
})