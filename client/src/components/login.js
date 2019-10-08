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
      password: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);

    window['login'] = this;
  }

onSubmit = () => {
    // if(true) // In case we want to check something
    history.push("/projects");
}

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
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
          <form className="form" method="get">
            <div className="enterEmailAddress">Email Address</div>
            <div className="rectangle">
              <input type="text" name="emailAddress" className="emailText" placeholder="Type your email here"/>
            </div>
            <div className="enterPassword">Password<span className="forgotPassword">Forgot your password?</span></div>
            <div className="rectangle">
              <input type={this.state.hidden ? "password" : "text"} value={this.state.password} onChange={this.handlePasswordChange} name="password" className="passwordText" placeholder="Type your password here"/>
              <span className={this.state.hidden ? "showPassword" : `showPasswordText ${display}`} onClick={this.toggleShow}></span>
            </div>
            <input className={`submitForm ${display}`} type="submit" value="Sign in" onClick={this.onSubmit}/>
          </form>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);