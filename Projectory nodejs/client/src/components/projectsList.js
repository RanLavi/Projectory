import React from "react";
import {Component} from "react";
// import "./layout.scss"
import "./projectsList.scss"
import history from "../index"
import Layout from './layout'
import ProjectsComponent from "./projects"
import TasksComponent from "./tasks"
import { connect } from 'react-redux';

class ProjectsListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      // chosenProjectIndex: -1,
      chosenProject: undefined,

      // tasks: [],
    };

    this.loadProjects = this.loadProjects.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.toggleShow = this.toggleShow.bind(this);
  }

  createKey(){
    return Math.random().toString(36).substr(2, 9);
  }

projectAttributes = () => {
  return {
    id: this.createKey(),
    // name: "Add New Project name", 
    tasks: [],
  }
}

addProject(){
  // console.log("Anastasia");
  // var newProject = new ProjectsComponent();

  // ID generate random ID
  
  const newProject = this.projectAttributes();
  const updatedProjectsArray = [...this.state.projects, newProject];
  const chosenProject= newProject;
  this.setState({projects: updatedProjectsArray, chosenProject});
}

  // this.setState({projects: [...this.state.projects, {name: "Add New Project name", tasks: []}], chosenProject: });

  

addTask(){
  const {projects, chosenProject} = this.state;
  const updatedProjectsArray = [...projects];
  const currentProjectIndex = projects.findIndex(p => p.id === chosenProject.id);
  updatedProjectsArray[currentProjectIndex].tasks.push({});
  
    // updatedProjectsArray[currentProjectIndex].tasks.push({id: '', value: '',});
  // updatedProjectsArray[chosenProject].tasks.push({id: '', value: '',});

  // this.setState({tasks: [...this.state.tasks, {name: "Add New Task description"}]});
  this.setState({projects: updatedProjectsArray, currentProject: updatedProjectsArray[currentProjectIndex]});
}

// onSubmit = () => {
//   history.push("/");
// }

  handleProjectClick = (project) => {
    this.setState({chosenProject: project});
  }

  deleteProject(id){
    console.log(id);
    // e.stopPropagation();
    const {projects} = this.state;
    let currentProjectIndex = projects.findIndex(p => p.id === id);
    console.log(currentProjectIndex);
    const updatedProjectsArray = [...projects];
    updatedProjectsArray.splice(currentProjectIndex, 1);
    this.setState({projects: updatedProjectsArray});
  }

  // renderProjects = (projects, chosenProjectIndex) => {
  //   return (
  //     projects.map((project, index) => (
  //       <div 
  //         className={`project-item-parent ${chosenProjectIndex===index ? 'selected' : ''}`} 
  //         onClick={() => this.handleProjectClick(index)}
  //       >   
  //         <ProjectsComponent key={`_${index}`} data={this.projectAttributes} handleClick={this.handleProjectClick} /> 
  //       </div>
  //     ))
  //   )
  // }

    renderProjects = (projects, chosenProject) => {
    return (
      projects.map((project, id) => (
        <div 
          className={`project-item-parent ${chosenProject.id===project.id ? 'selected' : ''}`} 
          onClick={() => this.handleProjectClick(project)}
        >   
          <ProjectsComponent key={`_${chosenProject}`} data={project.id} deleteProjectFromParent={(id) => this.deleteProject(id)} /> 
        </div>
      ))
    )
  }

  async loadProjects(){
    const response = await fetch('http://localhost:5000/getProjects');

  const myJson = await response.json();
  // console.log(myJson.email);
  debugger;

  this.setState({projects: myJson})
  }

  render() {
    const {projects, chosenProject} = this.state;
   
    return (
      <Layout>
          <div className="projectsList">
            <div className="projects-header">
              <div className="my-projects-header-text">My Projects</div>
              <div className="new-project-header">
                <div className="new-project-header-text">New Project</div>
                <div className="new-project-header-icon" onClick={() => this.addProject()}></div>
                </div>
            </div>
            <div className="project-items-container">
            {/* {projects.map((i) => <ProjectsComponent key={`_${i}`} data={this.projectAttributes} handleClick={() => this.handleProjectClick(i)} />)} */}


            {/* {projects.map((p, i) => <div onClick={() => this.handleProjectClick(i)}> <ProjectsComponent key={`${p.name}_${i}`} name={p.name} handleClick={this.handleProjectClick} /> </div>)} */}
    {this.renderProjects(projects, chosenProject)}

  {/* <div className={`menu-home-container ${display} ${this.isTabClicked('projects') ? 'clicked' : ''}`} onClick={() => this.onTabClick('projects')}> */}


            </div>
          </div>
          <div className="tasksList">
            <div className="tasks-header">
              <div className="current-project">Project name</div>
              <div className="new-task-header">
                <div className="new-task-header-text">New Task</div>
              <div className="new-task-header-icon" onClick={() => this.addTask()}></div>
              </div>
              </div>
                 <div className="task-items-container">
                  {chosenProject && chosenProject.tasks.map((j) => <TasksComponent key={this.createKey()}/>)}
            </div>
          </div>
      </Layout>
    );
  }
}


  function mapStateToProps(state) {
    // console.log('state ? ', state);
    return { 
      projects: state.projects
    }
  }

export default connect(mapStateToProps)(ProjectsListComponent);