import React, {Component} from "react";
import axios from "axios";
import "./style.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
} from "mdbreact";

class Login extends Component {
   constructor() {
      super();
      this.state = {
       allUsersData: [],
      }
   }

  getAllUsersData = async () => {
    await axios.get('/users')
    .then(response => {
      const allUsersData = response.data
      this.setState({ allUsersData });
    });
  }

   componentDidMount(){
     this.getAllUsersData();
   }

   onFormChange = (event) => {
     this.setState({ [event.target.name]: event.target.value });
   }

   onFormSubmit = (event) => {
    event.preventDefault();
    const allUsers = this.state.allUsersData;
    const username = this.state.username;
    const password = this.state.password;
    let userInfo;

    for(let user of allUsers){
      if (user.username === username && user.password === password){
        userInfo = user;
        this.props.getProfileProps(userInfo);
      }
    }
     
   }

   render() {
    return(
      <div className="main-login">
        <div className="info-app">
        <h1 className="logo-name">
        <span className="letter1">S</span>
        <span className="letter2">o</span>
        <span className="letter3">c</span>
        <span className="letter4">i</span>
        <span className="letter5">a</span>
        <span className="letter6">l</span>
        <span className="letter7">i</span>
        <span className="letter8">t</span>
        <span className="letter9">e</span>
        </h1>
        <br/>
        <br/>
        <p className="slogan">the best way to stay connected..</p></div>
        <div className="mdbcontainer">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard  className="column">
                  <MDBCardBody>
                    <MDBCardHeader className="form-header deep-blue-gradient rounded">
                      <h3 className="my-3">
                        <MDBIcon icon="lock" className="lock"/> <br /><span className="lock-login">Login</span>
                      </h3>
                    </MDBCardHeader>
                      <div className="space"> </div>
                      <form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
                        <div className="grey-text">
                          <div className="md-form">
                            <i className="fas fa-user-ninja prefix"></i>
                            <input type="text" name="username" placeholder="USERNAME" className="form-control validate" />
                          </div>
                          <div className="md-form">
                            <i className="fas fa-key prefix"></i>
                            <input type="password" name="password" placeholder="PASSWORD" className="form-control validate" />
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <MDBBtn
                            color="light-blue"
                            className="mb-3"
                            type="submit"
                          >
                            Login
                          </MDBBtn>
                        </div>
                      </form>
                    <div className="space2"> </div>
                    <MDBModalFooter>
                      <div className="font-weight-light">
                        <p>Not a member? <span className="sign">Sign Up</span></p>
                      </div>
                    </MDBModalFooter>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </div>
        </div>
    );
  }
}

export default Login;
