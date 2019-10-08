import React from "react";
import {Component} from "react";
import "./login.scss"
import history from "../index"
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
      username: "",
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    // window['login'] = this;
  }

async onSubmit() {
  // if(true) // In case we want to check something
  // let emailAddress = document.getElementsByClassName('emailText')[0].innerText;
  // let password = document.getElementsByClassName('showPasswordText')[0].innerHTML;
  if(this.state.password === '' || this.state.username === ''){
    return;
}

  // console.log('still working');
  // console.log(this.state.username);
  debugger;
  const response = await fetch('http://localhost:5000/');
  const myJson = await response.json();
  // console.log(myJson);
  history.push("/projects");
}

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

    handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  render() {
    const { display } = this.props;
    return (
      <div className="loginPageContainer">
        <div className={`logo ${display}`}></div>
        <div className="loginBox">
          <div className={`signIn ${display}`}>Sign in</div>
          <div className="enterDetailsBelow">Enter your details below</div>
            <div className="enterEmailAddress">Email Address</div>
            <div className="rectangle">
              <input type="text" name="emailAddress" value={this.state.username} className="emailText" placeholder="Type your email here" onChange={this.handleUsernameChange}/>
            </div>
            <div className="enterPassword">Password<span className="forgotPassword">Forgot your password?</span></div>
            <div className="rectangle">
              <input type={this.state.hidden ? "password" : "text"} value={this.state.password} onChange={this.handlePasswordChange} name="password" className="passwordText" placeholder="Type your password here"/>
              <span className={this.state.hidden ? "showPassword" : `showPasswordText ${display}`} onClick={this.toggleShow}></span>
            </div>
            <input className={`submitForm ${display}`} type="button" value="Sign in" onClick={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    username: state.username,
    display: state.display
  }
}

function mapDispatchToProps(dispatch) {
  return {
    makeAction: display => dispatch(actions.switchDisplay(display)),
    // makeAction: display => dispatch({ type: T.SWITCH_DISPLAY, display: display }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);