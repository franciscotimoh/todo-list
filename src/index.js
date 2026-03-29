import './styles.css';
import closeMUI from './icons/close-circle-outline.svg'; 
import { createProject } from "./project";

const sidebar = document.querySelector(".projects");
const addProjectButton = document.querySelector(".add-project"); 

let projects = []; 

function addProject(projectName) {
    projects.push(createProject(projectName));
    renderProjectList(); 
}

addProjectButton.addEventListener("click", function(e) {
    const newProjectName = prompt("Enter project name:");
    addProject(newProjectName); 
});

addProject("Your Project");
let currentProject = 0;

function createProjectElement(projectName) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.textContent = projectName;
    projectElement.addEventListener("click", checkOutProject);
    return projectElement; 
}

function createSidebarItem(projectName) {
    const sidebarItem = document.createElement("div");
    sidebarItem.classList.add("sidebar-item");
    sidebarItem.appendChild(createProjectElement(projectName));

    const removeProjectButton = document.createElement("img");
    removeProjectButton.classList.add('close');
    removeProjectButton.src = closeMUI;
    removeProjectButton.addEventListener("click", removeProject)
    sidebarItem.appendChild(removeProjectButton); 
    
    return sidebarItem; 
}

function renderProjectList() {
    sidebar.replaceChildren(); 
    for (const project of projects) {
        sidebar.appendChild(createSidebarItem(project.getProjectName())); 
    }
}

function checkOutProject(e) {
    const index = [...sidebar.children].indexOf(e.target);
    console.log(`Now leaving ${projects[currentProject].getProjectName()}`);
    currentProject = index;
    console.log(`Now seeing ${projects[currentProject].getProjectName()}`);
}

function removeProject(e) {
    const index = [...sidebar.children].indexOf(e.target.parentElement);
    projects.splice(index, 1);
    renderProjectList(); 
}
