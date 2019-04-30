import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import Timeline from '../Components/Timeline';
import "./style.css";

class App extends Component {
  constructor(){
    super();
    this.state = {
      userInfo:{},
      profileProps:null
    }
  }

  getProfileProps = (profileProps) => {
    this.setState({profileProps});
  }

  render() {
     return (this.state.profileProps === null ? 
        (
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <Login getProfileProps={this.getProfileProps} />} />
             <Route path="/users" component= {Profile} />
            <Route path="/timeline" component={Timeline} />
          </Switch>
        </div>
        ) :
        (
         <div className="App">
           <Switch>
             <Route exact path="/" render={() => <Profile {...this.state.profileProps} />} />
             <Route path={`/users/${this.state.profileProps.id}`} render={() => <Profile {...this.state.profileProps} />} />
             <Route path="/timeline" component={Timeline} />
           </Switch>
         </div>
        )

      )
  }
}
export default App;
