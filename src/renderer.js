import removeIcon from './icons/close-circle-outline.svg';
import editIcon from './icons/pencil-outline.svg'; 
import { showProjectDialog, showTodoDialog } from "./dialog";
import createProject from "./project";
import createTodo from "./todo";

function initRenderer(projectList) {
    const projects = document.querySelector("#sidebar .projects");
    const content = document.querySelector("#content");

    // Project handlers
    async function handleAddProject() {
        const projectName = await showProjectDialog();

        if (!projectName) {
            return; 
        }

        const project = createProject({ projectName });
        projectList.addProject(project);
        renderSidebar(); 
    }

    const addProjectButton = document.querySelector('button.add-project');
    addProjectButton.addEventListener("click", handleAddProject); 

    function handleSetActiveProject(e) {
        const sidebarItem = e.currentTarget.parentElement; 
        const project = projectList.getProjectById(sidebarItem.dataset.id);
        projectList.setActiveProject(project);
        renderSidebar();
        renderContent(); 
    }

    function handleRemoveProject(e) {
        const sidebarItem = e.currentTarget.parentElement;
        const project = projectList.getProjectById(sidebarItem.dataset.id); 
        if (project === projectList.getActiveProject()) {
            projectList.setActiveProject(null);
        }

        projectList.removeProject(project);
        renderSidebar();
        renderContent(); 
    }

    // Todo handlers
    async function handleAddTodo() {
        const todoMetadata = await showTodoDialog();
        if (!todoMetadata) {
            return; 
        }

        console.log(todoMetadata); 
        const todo = createTodo(todoMetadata);
        projectList.getActiveProject().addTodo(todo);
        renderContent(); 
    }

    async function handleEditTodo(e) {
        const todoItem = e.currentTarget.parentElement; 
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id);
        console.log(todo.getTodo()); 
        
        const todoMetadata = await showTodoDialog(todo.getTodo());
        if (!todoMetadata) {
            return; 
        }

        todo.updateTodo(todoMetadata);
        renderContent(); 
    }

    function handleToggleComplete(e) {
        const todoItem = e.currentTarget.parentElement;
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id); 
        const currentComplete = todo.getTodo().todoComplete;
        todo.setComplete(!currentComplete);
    }

    function handleRemoveTodo(e) {
        const todoItem = e.currentTarget.parentElement;
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id); 
        projectList.getActiveProject().removeTodo(todo);
        renderContent(); 
    }
    
    function renderSidebar() {
        projects.replaceChildren();

        for (const project of projectList.getProjects()) {
            const sidebarItem = document.createElement("div");

            const projectName = document.createElement("div");
            projectName.textContent = project.name;
            projectName.addEventListener("click", handleSetActiveProject);

            const removeProjectButton = document.createElement("button");
            removeProjectButton.type = "button"; 
            removeProjectButton.addEventListener("click", handleRemoveProject); 
            
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

    function renderTodoDetails(todo) {
        const detailsContainer = document.createElement("details");
        const todoSummary = document.createElement("summary");
        todoSummary.textContent = todo.todoTitle;

        const todoDetails = document.createElement("ul");

        const todoTitle = document.createElement("li");
        const todoTitleLabel = document.createElement("span");
        todoTitleLabel.textContent = "Title:";
        todoTitleLabel.classList.add("details-label");
        const todoTitleValue = document.createElement("p");
        todoTitleValue.textContent = todo.todoTitle;
        todoTitle.appendChild(todoTitleLabel);
        todoTitle.appendChild(todoTitleValue); 

        const todoDesc = document.createElement("li");
        const todoDescLabel = document.createElement("span");
        todoDescLabel.textContent = "Description:";
        todoDescLabel.classList.add("details-label");
        const todoDescValue = document.createElement("p");
        todoDescValue.textContent = todo.todoDesc;
        todoDesc.appendChild(todoDescLabel);
        todoDesc.appendChild(todoDescValue);

        const todoDueDate = document.createElement("li");
        const todoDueDateLabel = document.createElement("span");
        todoDueDateLabel.textContent = "Due Date:";
        todoDueDateLabel.classList.add("details-label");
        const todoDueDateValue = document.createElement("p");
        todoDueDateValue.textContent = todo.todoDueDate;
        todoDueDate.appendChild(todoDueDateLabel);
        todoDueDate.appendChild(todoDueDateValue); 

        const todoPriority = document.createElement("li");
        const todoPriorityLabel = document.createElement("span");
        todoPriorityLabel.textContent = "Priority:";
        todoPriorityLabel.classList.add("details-label");
        const todoPriorityValue = document.createElement("p");
        todoPriorityValue.textContent = todo.todoPriority;
        todoPriority.appendChild(todoPriorityLabel);
        todoPriority.appendChild(todoPriorityValue); 

        todoDetails.appendChild(todoTitle);
        todoDetails.appendChild(todoDesc);
        todoDetails.appendChild(todoDueDate);
        todoDetails.appendChild(todoPriority); 

        detailsContainer.appendChild(todoSummary);
        detailsContainer.appendChild(todoDetails); 

        return detailsContainer; 
    }

    function renderTodo(todo) {
        const todoItem = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.todoComplete;
        checkbox.addEventListener('change', handleToggleComplete);

        const todoDetails = renderTodoDetails(todo); 

        const editTodoButton = document.createElement("button"); 
        editTodoButton.type = "button"; 
        editTodoButton.addEventListener("click", handleEditTodo); 

        const editTodoButtonIcon = document.createElement("img"); 
        editTodoButtonIcon.src = editIcon; 
        editTodoButtonIcon.classList.add("icon");
        editTodoButton.appendChild(editTodoButtonIcon); 

        const removeTodoButton = document.createElement("button");
        removeTodoButton.type = "button";
        removeTodoButton.addEventListener("click", handleRemoveTodo); 

        const removeTodoButtonIcon = document.createElement("img"); 
        removeTodoButtonIcon.src = removeIcon;
        removeTodoButtonIcon.classList.add("icon");
        removeTodoButton.appendChild(removeTodoButtonIcon);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoDetails);
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
        addTodoButton.addEventListener("click", handleAddTodo)
        content.appendChild(addTodoButton); 
    }

    return { renderSidebar, renderContent };
}

export default initRenderer; 