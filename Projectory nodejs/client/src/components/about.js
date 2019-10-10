import React from "react";
import {Component} from "react";
import Layout from './layout'
import "./about.scss"

export default class AboutComponent extends Component {
    constructor(props) {
      super(props);
  
      // this.state = {
      //   isClicked: false
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
  
    render() {
      return (
        <Layout>
          <div className="about-layout">
            <div className="about-header">About Projectory</div>
            <div className="about-text"><p>We're Spectory, an end-to-end software development shop operating in Israel since early 2013 and providing software consultancy and development services in a variety of areas to customers of all sizes. We specialize in web apps, mobile apps, eCommerce and Internet of Things applications. All our services are tailored to specific customer needs and provided with a personal and customer-centric approach. Spectory has successfully delivered and maintains many projects in the above segments to customers ranging from independent entrepreneurs to fortune 500 companies.</p>
            <p>By providing exceptional customer service and aspiring to the highest professional standards, Spectory set a goal for itself to transform the way software services are provided and guarantee outstanding quality and complete customer satisfaction.</p>
            </div>
          </div>
        </Layout>
          )
      }
  }
  