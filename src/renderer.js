import removeIcon from './icons/close-circle-outline.svg';
import editIcon from './icons/pencil-outline.svg'; 

function initRenderer(projectList) {
    const projects = document.querySelector("#sidebar .projects");
    const content = document.querySelector("#content"); 

    function renderSidebar() {
        projects.replaceChildren();

        for (const project of projectList.getProjects()) {
            const sidebarItem = document.createElement("div");

            const projectName = document.createElement("div");
            projectName.textContent = project.name;

            const removeProjectButton = document.createElement("button");
            removeProjectButton.type = "button"; 
            
            const removeProjectButtonIcon = document.createElement("img"); 
            removeProjectButtonIcon.src = removeIcon;
            removeProjectButtonIcon.classList.add("icon");
            removeProjectButton.appendChild(removeProjectButtonIcon); 

            sidebarItem.appendChild(projectName);
            sidebarItem.appendChild(removeProjectButton);
            sidebarItem.dataset.id = project.id; 
            projects.appendChild(sidebarItem); 
        }
    }

    function renderTodo(todo) {
        const todoItem = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const todoTitle = document.createElement("div");
        todoTitle.textContent = todo.title;

        const editTodoButton = document.createElement("button"); 
        editTodoButton.type = "button"; 

        const editTodoButtonIcon = document.createElement("img"); 
        editTodoButtonIcon.src = editIcon; 
        editTodoButtonIcon.classList.add("icon");
        editTodoButton.appendChild(editTodoButtonIcon); 

        const removeTodoButton = document.createElement("button");
        removeTodoButton.type = "button"; 

        const removeTodoButtonIcon = document.createElement("img"); 
        removeTodoButtonIcon.src = removeIcon;
        removeTodoButtonIcon.classList.add("icon");
        removeTodoButton.appendChild(removeTodoButtonIcon);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTitle);
        todoItem.appendChild(editTodoButton);
        todoItem.appendChild(removeTodoButton); 

        todoItem.dataset.id = todo.id; 

        return todoItem; 
    }

    function renderContent() {
        content.replaceChildren();
        const currentActiveProject = projectList.getActiveProject();
        if (!currentActiveProject) return;

        const projectHeader = document.createElement("h1");
        projectHeader.textContent = currentActiveProject.getProjectName();
        content.appendChild(projectHeader); 

        for (const todo of currentActiveProject.getTodos()) {
            const renderedTodo = renderTodo(todo);
            content.appendChild(renderedTodo);
        }

        const addTodoButton = document.createElement("button");
        addTodoButton.textContent = "Add Todo"
        content.appendChild(addTodoButton); 
    }

    return { renderSidebar, renderContent };
}

export default initRenderer; 