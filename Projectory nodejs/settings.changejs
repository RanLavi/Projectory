import React from "react";
import {Component} from "react";
import Layout from './layout'
import "./settings.scss"
// import "../js/actions/index"
// import "../js/constants/action-types"
import * as actions from '../js/actions';
import { connect } from 'react-redux';

class SettingsComponent extends Component {
    constructor(props) {
      super(props);
  
    this.state = {
      clickedDisplay: "",
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  };
  
      // this.handlePasswordChange = this.handlePasswordChange.bind(this);
      // this.toggleShow = this.toggleShow.bind(this);
    
  
  // onSubmit = () => {
  //   history.push("/");
  // }
  
    // checkbox(){
    //   if(this.state.isClicked){
    //     document.querySelector("project-item").classList.remove("cross");
        
    //     this.state.isClicked = false;
    //   }
    //   else{
    //     document.querySelector("project-item").classList.add("cross");
    //     this.state.isClicked = true;
    //   }
    // } 

    async changeDisplay(){
      debugger;
      if(this.state.clickedDisplay === '' || this.props.display === this.state.clickedDisplay){
        return;
      }
      const response = await fetch('http://localhost:5000/changeTheme', {
        method: 'POST',
        // mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {"email": this.props.email, "theme" : this.state.clickedDisplay})
      });
        this.props.switchDisplay(this.state.clickedDisplay);
    }

    click(color){
      // console.log(color);
        this.setState({ clickedDisplay: color });
    }

    isBordered = (currentColor) => currentColor === this.state.clickedDisplay;
  
    render() {
      const { display } = this.props;
      const { clickedDisplay } = this.state;
      return (
        <Layout>
          <div className="settings-layout">
              <div className="settings-header-container">
                  <div className="settings-header-title">Themes</div>
                  <div className="settings-header-options">
                      <div className={`settings-header-options-cancel ${display}`}>Cancel</div>
                      {/* <div className={`settings-header-options-save ${display}`} onClick = {() => this.props.switchDisplay(clickedDisplay)}>Save</div> */}
                       <div className={`settings-header-options-save ${display}`} onClick = {() => this.changeDisplay()}>Save</div>
                  </div>
              </div>
              <div className="pick-theme-text">Pick your theme</div>
              <div className="themes">
                  <div className="dark-theme">
                      <div className={`dark-theme-icon ${this.isBordered('Dark') ? 'bordered' : ''}`} onClick = {() => this.click("Dark")}/>
                      <div className="dark-theme-text">Dark (Default)</div>
                  </div>
                  <div className="turquoise-theme">
                      <div className={`turquoise-theme-icon ${this.isBordered('Turquoise') ? 'bordered' : ''}`} onClick = {() => this.click("Turquoise")}/>
                      <div className="turquoise-theme-text">Turquoise</div>
                  </div>
              </div>
          </div>
        </Layout>
          )
      }
  }

  function mapStateToProps(state) {
    // console.log('state ? ', state);
    return { 
      display: state.display,
      email: state.email
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      switchDisplay: display => dispatch(actions.switchDisplay(display)),
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);