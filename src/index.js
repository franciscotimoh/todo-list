import { createProject } from "./project";

let projects = []; 
const project = createProject("PROJECT");
project.addTodo();
project.addTodo();
project.addTodo();

project.displayTodos();


