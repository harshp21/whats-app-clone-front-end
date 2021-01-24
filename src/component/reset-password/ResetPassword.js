import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Link, useParams } from 'react-router-dom';
import auth from '../../service/auth';
import './reset-password.css';
import ValidatorService from '../../service/validator';

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const params = useParams();
    const alert = useAlert();

    const onSubmitHandler = async () => {
        if (ValidatorService.isValidPassword(password)) {
            const data = {
                password,
                confirmPassword,
                token: params.resetToken
            }
            const res = await auth.resetPassword(data);
            if (res) {
                alert.success(res.message);
            } else {
                alert.error('Token expired');
            }
        } else {
            alert.error('Password should be greater than 6');
        }
    }
    return (
        <div className="reset-password">
            <div className="reset-password__header">
                <div className="reset-password__header_title">Reset Password</div>
                <div className="reset-password__header_sub-title">Remember your password? <Link to="/login"><span className="subtitle_link" id="login-account"> Login </span> </Link> to your account</div>
            </div>
            <div className="reset-password__input-container">
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="reset-password__input-container">
                <input
                    type="password"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="reset-password__submit-btn">
                <div className="submit-btn" onClick={onSubmitHandler}>Reset</div>
            </div>
        </div>
    )
}

export default ResetPassword
