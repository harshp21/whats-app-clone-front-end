import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registration.css';
import auth from "../../service/auth";
import { useAlert } from "react-alert";
import ValidatorService from '../../service/validator';

function Registration() {

    const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const alert = useAlert();

    const onSubmitHandler = async () => {
        const { username, email, password, confirmPassword } = userDetails;
        if (!ValidatorService.isEmail(email)) {
            alert.error('Please enter an valid email');
        } else if (!ValidatorService.isValidPassword(password)) {
            alert.error('Password should be greater than 6');
        } else if (password !== confirmPassword) {
            alert.error('Pasword and confirm password should be same');
        } else if (username !== '') {
            alert.error('Username cannot be blank');
        } else {
            const user = await auth.signUpUser(userDetails);
            if (user) {
                alert.success(user.message, { timeout: 10000 });
            } else {
                alert.error('Invalid credentails');
            }
        }
    }
    return (
        <div className="registration">
            <div className="registration__header">
                <div className="registration__header_title">Registration</div>
                <div className="registration__header_subtitle">
                    Already have an account?
                    <Link to="/login"><span className="subtitle_link" id="login-account"> Login </span> </Link>to the an
                    account
                  </div>
            </div>
            <div className="registration__input-container">
                <input
                    type="text"
                    placeholder="username"
                    className="user-name"
                    value={userDetails.username}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                />
            </div>
            <div className="registration__input-container">
                <input
                    type="email"
                    placeholder="email@domain.com"
                    className="user-email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
            </div>
            <div className="registration__input-container">
                <input
                    type="password"
                    placeholder="password"
                    className="user-password"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
            </div>
            <div className="registration__input-container">
                <input
                    type="password"
                    placeholder="confirm password"
                    className="user-password"
                    value={userDetails.confirmPassword}
                    onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
                />
            </div>

            <div className="registration__submit-btn">
                <div className="submit-btn" onClick={onSubmitHandler}>
                    Register
                  </div>
            </div>
        </div >
    )
}

export default Registration
