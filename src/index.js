import { createProject } from "./project";

let projects = []; 

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-22, License - CC BY-SA 4.0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await sleep(10000);

function addProject(projectName) {
    projects.push(createProject(projectName));
}

addProject("First Project");
let currentProject = 0;

function displayProjects() {
    for (const project of projects) {
        console.log(project.getProjectName());
    }
}

function checkOutProject(index) {
    console.log(`Now leaving ${projects[currentProject].getProjectName()}`);
    currentProject = index;
    console.log(`Now seeing ${projects[currentProject].getProjectName()}`);
}

function removeProject(index) {
    projects.splice(index, 1);
}


/* Todo-specific */
console.log("Adding a todo");
projects[currentProject].addTodo();

console.log("Adding a todo");
projects[currentProject].addTodo();

console.log("Adding a todo");
projects[currentProject].addTodo();

console.log("Displaying todo");
projects[currentProject].displayTodos();

console.log("Updating todo");
projects[currentProject].updateTodo(0);

console.log("Displaying todo");
projects[currentProject].displayTodos();

console.log("Removing todo");
projects[currentProject].removeTodo(0);

console.log("Displaying todo");
projects[currentProject].displayTodos();


/* Project specific */
console.log("Adding new project");
addProject("Second Project");

console.log("Displaying projects");
displayProjects();

console.log("Check out project 2");
checkOutProject(1);
projects[currentProject].addTodo();
projects[currentProject].displayTodos();

console.log("Go back to project 1");
checkOutProject(0);
projects[currentProject].displayTodos();

console.log("Remove project 2");
removeProject(1);
displayProjects();


