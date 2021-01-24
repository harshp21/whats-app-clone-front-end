import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import auth from '../../service/auth';
import './forgot-password.css';
import ValidatorService from '../../service/validator';

function ForgotPassword() {

    const initialEmail = '';
    const [email, setEmail] = useState(initialEmail);
    const alert = useAlert();

    const onSubmitHandler = async () => {
        if (ValidatorService.isEmail(email)) {
            const res = await auth.forgotPassword({ email });
            if (res) {
                alert.show(res.message);
            }
        } else {
            alert.error('Please enter an valid email');
        }
    }
    return (
        <div className="forgot-password">
            <div className="forgot-password__header">
                <div className="forgot-password__header_title">Forgot password</div>
                <div className="forgot-password__header_subtitle">
                    Already have an account?
                    <Link to="/login">
                        <span className="subtitle_link"> Login </span>
                    </Link> to
                    the an account
                  </div>
            </div>
            <div className="forgot-password__input-container">
                <input
                    type="email"
                    placeholder="email@domain.com"
                    className="user-email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="forgot-password__submit-btn">
                <div className="submit-btn" onClick={onSubmitHandler}>
                    Submit
                  </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
