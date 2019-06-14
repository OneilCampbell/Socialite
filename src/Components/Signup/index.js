import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import "./style.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBCardHeader,
  MDBBtn,
} from "mdbreact";


class Signup extends Component{
    constructor(){
        super();
        this.state={
            validUsername: true,
            matchingPasswords: true,
            newUserAdded: false,
            newUserInfo:null,
        }
    }

    getAllUsernames = () => {
        let allUsers = this.props.location.state.allUsersData;
        let allUsernames = allUsers.map(user => user.username);
        return allUsernames;
    }

    validateInfo = () => {
        let userInfo = this.state;
        let allUsernames = this.getAllUsernames();
        if(userInfo.password !== userInfo.confirmPassword){
            let matchingPasswords = false;
            this.setState({matchingPasswords});
            return false;
        }
        if(allUsernames.includes(userInfo.username)){
            let validUsername = false;
            this.setState({validUsername});
            return false;
        }
        return true;
    }

    onFormChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, matchingPasswords:true, validUsername:true });
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        if(this.validateInfo()){
            let fullname = this.state.fullName;
            let space = fullname.indexOf(" ");
            let firstname = fullname.substring(0, space);
            let lastname = fullname.substring(space+1);
            let newUserInfo = {
                firstname,
                lastname,
                username:this.state.username,
                password:this.state.password,
                email:"",
                image:""
            }
            await axios.post("/users", newUserInfo).then(response => {
                if(response.data === true){
                    let newUserAdded = true;
                    this.setState({newUserAdded, newUserInfo});
                }
            })
        }
    }

    render(){
        console.log(this.props);
        let newUserInfo = this.state.newUserInfo;
        let newUserAdded = this.state.newUserAdded;
        let validUsername = this.state.validUsername;
        let matchingPasswords = this.state.matchingPasswords;
       return(
           !newUserAdded ?
           <div className="sign-up-page">
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
                    <p className="slogan">the best way to stay connected..</p>
                </div>
            <div className="mdbcontainer signup-container">
                <MDBContainer className="signup-form-div">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard  className="column">
                                <MDBCardBody className="signup-form-square">
                                    <MDBCardHeader className="form-header deep-blue-gradient rounded signup-square">
                                        <h3 className="my-3 sign-up-my-3">
                                            <span className="lock-login signup-words">Signup</span>
                                        </h3>
                                    </MDBCardHeader>
                                    <form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
                                        <div className="grey-text">
                                            <div className="md-form">
                                                <i className="fas fa-user-ninja prefix"></i>
                                                <input type="text" name="fullName" placeholder="FULL NAME" className="form-control validate" />
                                            </div>
                                            {validUsername ? null : <p className="signup-error-message">Username Already Taken</p>}
                                            <div className="md-form">
                                                <i className="fas fa-user prefix"></i>
                                                <input type="text" name="username" placeholder="USERNAME" className="form-control validate" />
                                            </div>
                                            {matchingPasswords ? null : <p className="signup-error-message">Passwords Do Not Match</p>}
                                            <div className="md-form">
                                                <i className="fas fa-key prefix"></i>
                                                <input type="password" name="password" placeholder="PASSWORD" className="form-control validate" />
                                            </div>
                                            <div className="md-form">
                                                <i className="fas fa-key prefix"></i>
                                                <input type="password" name="confirmPassword" placeholder="CONFIRM PASSWORD" className="form-control validate" />
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <MDBBtn
                                                color="light-blue"
                                                className="mb-3"
                                                type="submit"
                                            >
                                                Sign Up
                                            </MDBBtn>
                                        </div>
                                    </form>
                                    <div className="space2"> </div>
                                    <MDBModalFooter>
                                    <div className="font-weight-light">
                                        <p>Already a member? <span className="sign"><Link to={{pathname:"/"}}>Log In</Link></span></p>
                                    </div>
                                    </MDBModalFooter>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
        :
        <Redirect to={{pathname:"/users", state:{...newUserInfo}}} />
       ) 
    }
}

export default Signup;