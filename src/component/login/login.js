import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import auth from "../../service/auth";
import { useAlert } from "react-alert";
import ValidatorService from '../../service/validator';

const Login = ({ handleCreateAccountLink }) => {

    const history = useHistory();
    const alert = useAlert();

    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

    const onSubmitHandler = async () => {
        if (!ValidatorService.isEmail(userCredentials.email)) {
            alert.error('Please enter an valid email');
        } else if (!ValidatorService.isValidPassword(userCredentials.password)) {
            alert.error('Password should be greater than 6');
        } else {
            const data = await auth.signInUser(userCredentials);
            if (data) {
                alert.success(data.message);
                history.push('/app');
            } else {
                alert.error('Unable to login');
            }
        }
    }

    return (
        <div className="login">
            <div className="login__header">
                <div className="login__header_title">Login</div>
                <div className="login__header_subtitle">
                    Do you have an account?
                     <Link to="/register">
                        <span className="subtitle_link" onClick={handleCreateAccountLink}>
                            Create an account</span>
                    </Link>, it takes less than a minute
                  </div>
            </div>
            <div className="login__input-container">
                <input
                    type="email"
                    placeholder="email@domain.com"
                    className="user-email"
                    value={userCredentials.email}
                    onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                />
            </div>
            <div className="login__input-container">
                <input
                    type="password"
                    placeholder="password"
                    className="user-password"
                    value={userCredentials.password}
                    onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                />
            </div>
            <div className="login__forgot-container">
                <Link to="/forgot-password">
                    <div className="login__forgot-container_link">
                        Forgot password?
                    </div>
                </Link>
            </div>
            <div className="login__submit-btn">
                <div className="submit-btn" onClick={onSubmitHandler}>Submit</div>
            </div>
        </div>
    )
}

export default Login
