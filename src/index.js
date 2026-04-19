import './styles.css';
import createProjectList from './projectList';
import createProject from './project';
import createTodo from './todo';
import initRenderer from './renderer';

import { showProjectDialog, showTodoDialog } from './dialog';

// Create a projectList
const projectList = createProjectList();

// Create a couple project instances...
const project1 = createProject({ projectName: "Project 1"});
const project2 = createProject({ projectName: "Project 2"});
const project3 = createProject({ projectName: "Project 3"});

// ...and add them
projectList.addProject(project1);
projectList.addProject(project2);
projectList.addProject(project3); 

// Create some todo instances...
function generateTodo(i) {
    const text = "Todo " + String(i);
    const date = new Date(); 
    const priorityOptions = ["Low", "Medium", "High"];
    const priority = priorityOptions[Math.floor(Math.random() * priorityOptions.length)];

    const params = {
        todoTitle: text,
        todoDesc: text,
        todoDueDate: date,
        todoPriority: priority,
        todoComplete: false,
    };

    return createTodo(params); 
}

const todo1 = generateTodo(1);
const todo2 = generateTodo(2);
const todo3 = generateTodo(3);
const todo4 = generateTodo(4);
const todo5 = generateTodo(5);

project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);
project2.addTodo(todo4);
project3.addTodo(todo5);

projectList.setActiveProject(project1);
console.log(projectList.getProjects()); 

const renderer = initRenderer(projectList);
renderer.renderSidebar();
renderer.renderContent(); 

// const response = await showProjectDialog();
const response = await showTodoDialog(); 
alert(response); 