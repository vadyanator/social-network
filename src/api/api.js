import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '5b1d2518-93db-49ed-891b-804c1c4bee27'
    }
})

export const usersAPI = {
    getUsers(currentPage, usersOnPage) {
        return instance.get(`users?page=${currentPage}&count=${usersOnPage}`)
            .then(response => response.data)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data.resultCode)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data.resultCode)
    }
}

export const profileAPI = {
    getUser(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    
    getProfileStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },

    updateProfileStatus(status) {
        return instance.put(`profile/status`, {status})
    },
    updateAvatar(avatar) {
        const formData = new FormData();
        formData.append('image', avatar)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfileData(formData) {
        return instance.put(`profile`, formData)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}

