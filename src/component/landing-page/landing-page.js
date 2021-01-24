import React from "react";
import Login from '../login/login';
import './landing-page.css';
import Registration from '../registration/registration';
import ForgotPassword from '../forgot-password/forgotPassword';
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import ResetPassword from "../reset-password/ResetPassword";

function LandingPage() {

    return (
        <div className="app">
            <div className="app__content">

                <div className="form-sideimage">
                    <div className="form-title">
                        <div className="form-sideimage__title"> Whats App clone</div>
                        <div className="form-sideimage__subtitle">“Communication is at the very core of our society. That’s what makes us human.”  - <strong>Jan Koum, Co-founder/CEO Whatsapp</strong></div>
                    </div>
                </div>
                <div className="form-container">
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Registration} />
                        <Route exact path='/forgot-password' component={ForgotPassword} />
                        <Route exact path='/reset-password/:resetToken' component={ResetPassword} />
                        <Route exact path='/'>
                            <Redirect to='/login' />
                        </Route>
                        <Route path="*">
                            <Redirect to="/404" />
                        </Route>
                    </Switch>
                </div>

            </div>
        </div >
    )
}

export default LandingPage
