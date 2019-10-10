import React from "react";
import {Component} from "react";
// import "./layout.scss"
import "./tasks.scss"
import history from "../index"
import Layout from './layout'
import ProjectsListComponent from "./projectsList"

class TasksComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isChecked: [],
    };

    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.toggleShow = this.toggleShow.bind(this);
  }

// addProject(){
//   let projectItem = document.createElement("div").classList.add("project-item");
//   let projectPickByName = document.createElement("div").classList.add("project-pick-by-name");
//   let projectPick = document.createElement("div").classList.add("project-pick");
//   let projectName = document.createElement("div").classList.add("project-name");
//   let projectItemsContainer = document.getElementsByClassName("project-items-container")[0];
// }

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

//   createDate(){
//       var date = new Date(`new Date().getFullYear(), '/', new Date().getMonth() , '/', new Date().getDate()`);
//       return date;
//   }

crossTask(){
            // <div className={`dark-theme-icon ${this. isBordered('Dark') ? 'bordered' : ''}`} onClick = {() => this.click("Dark")}/>
    
    // document.getElementsByClassName().appendChild(element);

}

  render() {
    return (
            <div className="task-item">
            <div className="task-pick-by-name">
                <div className="task-pick" onClick={() => this.crossTask()}>
                    <div className="task-checked"/> 
                </div>
                <input className="task-name" type="text" placeholder="Add a new task name"/>
            </div>
            </div>
    );
  }
}

export default TasksComponent;