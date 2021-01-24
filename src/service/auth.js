import axois from 'axios';

class Auth {
    constructor() {
        this.apiUrl = 'http://localhost:5000';
        this.isAuthenticatedUser = false;
        this.isUserLoggedIn();
    }

    signInUser = async (userCredentials) => {

        try {
            let res = await axois.post(`${this.apiUrl}/user/login`, userCredentials);
            if (res.data) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.user.userId);
                this.isAuthenticatedUser = true
            }
            return res.data;
        } catch (err) {
        }
    }

    isUserLoggedIn = async () => {
        try {
            if (!this.isAuthenticatedUser) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
                let res = await axois.get(`${this.apiUrl}/user/ping`, {
                    headers
                });
                this.isAuthenticatedUser = (res.data) ? true : false
                return res.data;
            }

        } catch (err) {
            return this.isAuthenticatedUser;
        }

    }

    isUserAuthenticated = () => {
        return this.isAuthenticatedUser || localStorage.getItem('token') !== null;
    }

    signUpUser = async (userDetails) => {
        try {
            const headers = {
                "Content-type": "application/json",
            }
            let res = await axois.post(`${this.apiUrl}/user/register`, userDetails, {
                headers
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    forgotPassword = async (userDetails) => {
        try {
            const headers = {
                "Content-type": "application/json",
            }
            let res = await axois.post(`${this.apiUrl}/user/forgot-password`, userDetails, {
                headers
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    resetPassword = async (userDetails) => {
        try {
            const headers = {
                "Content-type": "application/json",
            }
            let res = await axois.post(`${this.apiUrl}/user/reset-password`, userDetails, {
                headers
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new Auth();