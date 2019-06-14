import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Profile from '../Components/Profile';
import Timeline from '../Components/Timeline';
import "./style.css";

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/users" component= {Profile} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </div>
    )
}

export default App;
