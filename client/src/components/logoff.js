import React from "react";
import {Component} from "react";
import Layout from './layout'
import "./logoff.scss"
import history from "../index"
import { connect } from 'react-redux';


class LogoffComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

submitStay = () => {
    // history.back();
    history.push("/projects");
    this.props.hideMeFromParent();
}

submitLogout = () => {
    history.push("/");
}

  render() {
    const { display } = this.props;
    return (
      <div className='modal-container'>
        <div className="logoff-container">
            <div className='logoff-header'>
                <div className="logoff-header-text">Logout</div>
                <div className='logoff-header-x' onClick={this.submitStay}>x</div>
            </div>
            <div className="logoff-body-container">
                <div className='logoff-body-text'>Are you sure you want to log out from Projectory?</div>
                <div className='logoff-bottom-container'>
                    <div className={`logoff-bottom-logout-text ${display}`} onClick={this.submitLogout}>Logout</div>
                    <div className={`logoff-bottom-stay-text ${display}`} onClick={this.submitStay}>Stay</div>
                </div>
            </div>
        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    display: state.display
  }
}

export default connect(mapStateToProps)(LogoffComponent);