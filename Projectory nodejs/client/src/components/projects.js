import React from "react";
import {Component} from "react";
// import "./layout.scss"
import "./projects.scss"
import history from "../index"
import Layout from './layout'
import ProjectsListComponent from "./projectsList"


class ProjectsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isChecked: false,
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

  onProjectClick = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  // deleteProject(){
  //   document.getElementsByClassName("project-item")[0].remove();
  // }

  /* checking if the tab(container) is the current clicked tab according to the clickedTab state */ 
  // isProjectClicked = (currentProject) => this.state.isChecked.includes(currentProject);
  render() {
    return (
            <div className='project-item'>
            {/* <div className="project-pick-container"> */}
                {/* <div className="project-pick" onClick={() => this.crossProject()}></div> */}
                    {/* <div className={`project-pick ${this.isProjectClicked() ? 'checked' : ''}`} onClick={() => this.onProjectClick()}/> */}
                    <div className={`project-pick ${this.state.isChecked ? 'checked' : ''}`} onClick={() => this.onProjectClick()}/>
                    <div className={`project-name-and-date ${this.state.isChecked ? 'cross' : ''}`}>
                <input className="project-name" type="text" placeholder="Add a new project name"/>
            {/* </div> */}
            <div className="project-create-date">Today</div>
            <div className="project-delete" onClick = {(e) => {
              // console.log("e ? ", e);
              e.stopPropagation();
              this.props.deleteProjectFromParent(this.props.data)}}/>
              {/* </div> */}
              </div>
            </div>
    );
  }
}

export default ProjectsComponent;