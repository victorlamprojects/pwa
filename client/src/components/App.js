import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import withAuth from './Authentication/withAuth.component';
import Navs from "./NavBar/navbar.component";
import Home from "./Content/home.component";
import Signin from "./SignIn/signin.component";
import SignOut from "./SignIn/signout.component";

function App() {
  return (
    <Router>
      <Navs/>
      <br/>
      <div>
        <Switch>
          <Route path='/' exact component = {withAuth(Home)} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={withAuth(SignOut)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
