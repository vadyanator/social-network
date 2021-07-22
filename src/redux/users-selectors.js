export const getUsersData = (state) => {
    return state.usersData.users
}

export const getUsersAmount = (state) => {
    return state.usersData.usersAmount
}

export const getUsersOnPage = (state) => {
    return state.usersData.usersOnPage
}

export const getCurrentPage = (state) => {
    return state.usersData.currentPage
}

export const getIsLoading = (state) => {
    return state.usersData.isLoading
}

export const getToggleFollowingInProgress = (state) => {
    return state.usersData.toggleFollowingInProgress
}