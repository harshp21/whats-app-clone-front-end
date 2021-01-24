import React from 'react';
import { Link } from 'react-router-dom';
import './page-not-found.css';

function PageNotFound() {
    return (
        <div className="page-not-found">
            <div className="page-not-found__content">
                <div className="home-btn-container">
                    <Link to="/login">
                        <div className="home-btn">home</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
