import React from "react";
import { Component } from "react";
import "./layout.scss"
import history from "../index"
import { connect } from 'react-redux';
import LogoffComponent from "./logoff"

class layout extends Component {
  constructor(props) {
    super(props);

    const currentTab = document.location.pathname;

    this.state = {
      clickedTab: currentTab.substr(1),
      show: false,
    };
  };

  onTabClick = (currentTab) => {
    this.setState({ clickedTab: currentTab });
    history.push(`/${currentTab}`);
  }

  /* checking if the tab(container) is the current clicked tab according to the clickedTab state */ 
  isTabClicked = (currentTab) => currentTab === this.state.clickedTab;

  // const y= '123123'
  // const x = `test${y}`;
  // const x = 4 + 'asdasd ' + 'asdasd'

  logoff(){
    this.setState({ clickedTab: 'logoff', show: true}); 
  }

  hideLogout(){
    this.setState({ clickedTab: 'projects', show: false});
  }

  render() {
    const { display, email } = this.props;
    // console.log('layout');
    // console.log(email);
    // const { clickedTab } = this.state;
    return (
      <div className="projectsPageContainer">
        <div className="sideMenu">
          <div className="top">
            <div className="menuIcon"></div>
            <div className={`menu-home-container ${display} ${this.isTabClicked('projects') ? 'clicked' : ''}`} onClick={() => this.onTabClick('projects')}>
              <div className="menuHome" />
              <div className="sideMenuText">Home</div>
            </div>
            <div className={`menu-about-container ${display} ${this.isTabClicked('about') ? 'clicked' : ''}`} onClick={() => this.onTabClick('about')}>
              <div className='menuAbout' />
              <div className="sideMenuText">About</div>
            </div>
            <div className={`menu-settings-container ${display} ${this.isTabClicked('settings') ? 'clicked' : ''}`} onClick={() => this.onTabClick('settings')}>
              <div className="menuSettings"></div>
              <div className="sideMenuText">Settings</div>
            </div>
          </div>
          <div className="bottomSideMenu">
            <div className={`menu-settings-container ${display} ${this.isTabClicked('logoff') ? 'clicked' : ''}`} onClick={() => this.logoff()}>
              <div className="menuLogout"></div>
              <div className="sideMenuTextLogout">Logout</div>
            </div>
          </div>
        </div>
        <div className="mainMenu">
          <div className="main-header">
            <div className={`logo ${display}`}></div>
            <div className="user">{email}</div>
          </div>
          <div className="lists">
            {this.props.children}
          </div>
        </div>
         <div className={this.state.show ? 'show-logout' : 'hide-logout'}> 
         <LogoffComponent hideMeFromParent={() => this.hideLogout()}/>
         </div>
      </div>
    )
  }
}


  function mapStateToProps(state) {
    return { 
      display: state.display,
      email: state.email
    }
  }
  
  export default connect(mapStateToProps)(layout);
