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

    this.loadProjects();
  }

  createKey(){
    return Math.random().toString(36).substr(2, 9);
  }

projectAttributes = (projectID) => {
  return {
    id: projectID,
    // id: this.createKey(),
    // name: "Add New Project name", 
    tasks: [],
  }
}

async addProject(){
  // ID generate random ID
  
  // const newProject = this.projectAttributes();
  // const updatedProjectsArray = [...this.state.projects, newProject];
  // const chosenProject= newProject;
  // this.setState({projects: updatedProjectsArray, chosenProject});

  const response = await fetch('http://localhost:5000/addProject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Accept': 'application/json' },
    body: JSON.stringify({"email" : this.props.email})
  });
  const myJson = await response.json();
  
  const newProject = this.projectAttributes(myJson.project_id);
  const updatedProjectsArray = [...this.state.projects, newProject];
  const chosenProject= newProject;
  this.setState({projects: updatedProjectsArray, chosenProject});
}

  // this.setState({projects: [...this.state.projects, {name: "Add New Project name", tasks: []}], chosenProject: });

  async loadProjects(){
    debugger;
    const response = await fetch('http://localhost:5000/getProjects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Accept': 'application/json' },
    body: JSON.stringify({"email" : this.props.email})
  });

    var myJson = await response.json();
    console.log(myJson);

    

    this.setState({projects: myJson})

    // this.renderProjects(this.state.projects);

    console.log(this.state.projects);
  }
  

async addTask(){
  const {projects, chosenProject} = this.state;
    if(chosenProject===undefined){
      return;
    }


    debugger;
    const response = await fetch('http://localhost:5000/addTask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Accept': 'application/json' },
    body: JSON.stringify({"project_id" : chosenProject.project_id})
  });

    var myJson = await response.json();
    console.log(myJson);

  const updatedProjectsArray = [...projects];
  const currentProjectIndex = projects.findIndex(p => p.project_id === chosenProject.project_id);
  updatedProjectsArray[currentProjectIndex].tasks.push({});
  
    // updatedProjectsArray[currentProjectIndex].tasks.push({id: '', value: '',});
  // updatedProjectsArray[chosenProject].tasks.push({id: '', value: '',});

  // this.setState({tasks: [...this.state.tasks, {name: "Add New Task description"}]});
  this.setState({projects: updatedProjectsArray, currentProject: updatedProjectsArray[currentProjectIndex]});

      console.log(this.state.projects);
}

// onSubmit = () => {
//   history.push("/");
// }

  handleProjectClick = (project) => {
    this.setState({chosenProject: project});
  }

  async deleteProject(project_id){
    debugger;
    console.log(project_id);
    // e.stopPropagation();
    const {projects} = this.state;
    let currentProjectIndex = projects.findIndex(project => project.project_id === project_id);
    console.log(currentProjectIndex);

    const response = await fetch('http://localhost:5000/deleteProject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Accept': 'application/json' },
    body: JSON.stringify({"project_id" : project_id, "email" : this.props.email})
  });

    var myJson = await response.json();
    console.log(myJson);


    // const updatedProjectsArray = [...projects];
    // updatedProjectsArray.splice(currentProjectIndex, 1);


    this.setState({projects: myJson, undefined});
    console.log(this.state.projects);
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
      debugger;
    // if(chosenProject === undefined){
    //   return;
    // }
    return (
      projects.map((project) => (
        <div 
          className={`project-item-parent ${chosenProject !== undefined && chosenProject.project_id===project.project_id ? 'selected' : ''}`} 
          onClick={() => this.handleProjectClick(project)}
        >   
          <ProjectsComponent key={`_${chosenProject}`} projectId={project.project_id} email={this.props.email} startDate={project.start_date} projectName={this.project_name} deleteProjectFromParent={(project_id) => this.deleteProject(project_id)} /> 
        </div>
      ))
    )
    
  }

//   componentDidMount() {
//   this.loadProjects();
// }



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
      projects: state.projects,
      email: state.email
    }
  }

export default connect(mapStateToProps)(ProjectsListComponent);