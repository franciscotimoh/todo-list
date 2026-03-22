import { createTodo } from "./todo";

function createProject(name) {
    let project = [], projectName = name;

    function promptForTodo() {
        const title = prompt("Enter title");
        const desc = prompt("Enter description");
        let urgent = prompt("Is it urgent? Y/N");
        let complete = prompt("Is it complete? Y/N");

        urgent = urgent === "Y" || urgent === "y";
        complete = complete === "Y" || complete === "y";
        return {
            title,
            desc,
            urgent,
            complete
        }; 
    }

    function displayTodos() {
        for (const todo of project) {
            todo.displayTodo(); 
        }
    }

    function getProjectName() {
        return projectName; 
    }
    
    function addTodo() {
        const { title, desc, urgent, complete } = promptForTodo(); 
        let todo = createTodo(title, desc, urgent, complete);
        project.push(todo); 
    }

    function updateTodo(index) {
        const { title, desc, urgent, complete } = promptForTodo(); 
        let updatedTodo = createTodo(title, desc, urgent, complete);
        project[index] = updatedTodo;
    }

    function removeTodo(index) {
        project.splice(index, 1);
    }

    console.log("Project created");

    return { addTodo, updateTodo, removeTodo, displayTodos, getProjectName }; 
}

export { createProject };