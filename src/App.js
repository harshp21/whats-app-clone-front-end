import './App.css';
import React from "react";
import LandingPage from './component/landing-page/landing-page';
import ProtectedRoute from './component/protected-route/protectedRoute';
import chatApp from "./component/chat-app/ChatApp";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ActivateAccount from './component/activate-account/ActivateAccount';
import PageNotFound from './component/page-not-found/PageNotFound';


function App() {

  const options = {
    timeout: 3000,
    position: positions.TOP_RIGHT
  };

  return (
    <>
      {/* <UserContext.Provider value={{ userState, dispatch }}> */}
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/app" component={chatApp} />
            <Route path="/activate-account/:activationCode" component={ActivateAccount} />
            <Route path='/404' component={PageNotFound} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
      {/* </UserContext.Provider> */}
    </>

  );
}

export default App;
