import axios from 'axios';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useHistory, useParams } from 'react-router-dom';
import './account-activation.css';
import { apiUrl } from '../../context/UserContext';

function ActivateAccount() {
    const params = useParams();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
    }, [])

    const activateAccount = async () => {
        const result = await axios.post(`${apiUrl}/user/activate-account/${params.activationCode}`);
        if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            alert.success(result.data.message);
            history.push('/app');
        } else {
            alert.error(result.data.message);
        }
    }

    return (
        <div className='account-activation'>
            <div className="account-activation__content">
                <div className="account-activation__content_title">Just one more step...</div>
                <div className="account-activation__content_subtitle">Click the button below to activate the whats app clone account</div>
                <div className="account-activation__content_logo">
                    <div className="img-container">
                        <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt='whats-app-clone' />
                    </div>
                    <div className="account-activation__content_app-name"> Whats app clone</div>
                </div>
                <div className="account-activation__content_btn">
                    <div className="activation-btn" onClick={activateAccount}>Acitvate Account</div>
                </div>
            </div>
        </div>
    )
}

export default ActivateAccount
