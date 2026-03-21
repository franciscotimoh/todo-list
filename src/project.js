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
    
    function addTodo() {
        const { title, desc, urgent, complete } = promptForTodo(); 
        let todo = createTodo(title, desc, urgent, complete);
        project.push(todo); 
    }

    function displayTodos() {
        for (const todo of project) {
            todo.displayTodo(); 
        }
    }

    console.log("Project created");

    return { addTodo, displayTodos }; 
}

export { createProject };