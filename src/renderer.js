import removeIcon from './icons/close-circle-outline.svg';
import editIcon from './icons/pencil-outline.svg'; 
import { showProjectDialog, showTodoDialog } from "./dialog";
import createProject from "./project";
import createTodo from "./todo";
import { save } from './storage'; 

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

        const todo = createTodo(todoMetadata);
        projectList.getActiveProject().addTodo(todo);
        renderContent(); 
    }

    async function handleEditTodo(e) {
        const todoItem = e.currentTarget.parentElement; 
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id);
        
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

    function handleToggleCollapse(e) {
        const collapseElement = e.currentTarget.parentElement.nextElementSibling;
        if (collapseElement.classList.contains("hidden")) {
            collapseElement.classList.remove("hidden"); 
        } else {
            collapseElement.classList.add("hidden"); 
        }
    }
    
    function renderSidebar() {
        projects.replaceChildren();
        save(projectList);

        for (const project of projectList.getProjects()) {
            const sidebarItem = document.createElement("div");
            sidebarItem.classList.add("sidebar-item");

            const projectName = document.createElement("div");
            projectName.textContent = project.name;
            projectName.addEventListener("click", handleSetActiveProject);
            projectName.classList.add("sidebar-project-name");
            if (project.id === projectList.getActiveProject()?.getProjectId()) {
                projectName.classList.add("active-project");
            }

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

    function renderTodoCollapse(todo) {
        const todoCollapseContainer = document.createElement("div");
        
        const todoTitle = document.createElement("div");
        const todoTitleLabel = document.createElement("span");
        todoTitleLabel.textContent = "Title: ";
        todoTitleLabel.classList.add("details-label");
        const todoTitleValue = document.createElement("span");
        todoTitleValue.textContent = todo.todoTitle;
        todoTitle.appendChild(todoTitleLabel);
        todoTitle.appendChild(todoTitleValue); 

        const todoDesc = document.createElement("div");
        const todoDescLabel = document.createElement("span");
        todoDescLabel.textContent = "Description: ";
        todoDescLabel.classList.add("details-label");
        const todoDescValue = document.createElement("span");
        todoDescValue.textContent = todo.todoDesc;
        todoDesc.appendChild(todoDescLabel);
        todoDesc.appendChild(todoDescValue);

        const todoDueDate = document.createElement("div");
        const todoDueDateLabel = document.createElement("span");
        todoDueDateLabel.textContent = "Due Date: ";
        todoDueDateLabel.classList.add("details-label");
        const todoDueDateValue = document.createElement("span");
        todoDueDateValue.textContent = todo.todoDueDate;
        todoDueDate.appendChild(todoDueDateLabel);
        todoDueDate.appendChild(todoDueDateValue); 

        const todoPriority = document.createElement("div");
        const todoPriorityLabel = document.createElement("span");
        todoPriorityLabel.textContent = "Priority: ";
        todoPriorityLabel.classList.add("details-label");
        const todoPriorityValue = document.createElement("span");
        todoPriorityValue.textContent = todo.todoPriority;
        todoPriority.appendChild(todoPriorityLabel);
        todoPriority.appendChild(todoPriorityValue);

        todoCollapseContainer.appendChild(todoTitle);
        todoCollapseContainer.appendChild(todoDesc);
        todoCollapseContainer.appendChild(todoDueDate);
        todoCollapseContainer.appendChild(todoPriority);

        return todoCollapseContainer; 
    }

    function renderTodo(todo) {
        const todoContainer = document.createElement("div"); 
        const todoItem = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.todoComplete;
        checkbox.addEventListener('change', handleToggleComplete);

        const todoCollapse = renderTodoCollapse(todo);
        todoCollapse.classList.add("hidden");
        todoCollapse.classList.add("todo-collapse"); 

        const todoTitle = document.createElement("span");
        todoTitle.textContent = todo.todoTitle;
        todoTitle.classList.add("todo-title"); 
        todoTitle.addEventListener("click", handleToggleCollapse); 

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
        todoItem.appendChild(todoTitle);
        todoItem.appendChild(editTodoButton);
        todoItem.appendChild(removeTodoButton); 

        todoItem.dataset.id = todo.id;

        todoItem.classList.add("todo-item");

        todoContainer.appendChild(todoItem);
        todoContainer.appendChild(todoCollapse); 

        return todoContainer; 
    }

    function renderContent() {
        content.replaceChildren();
        save(projectList);
        const currentActiveProject = projectList.getActiveProject();
        if (!currentActiveProject) return;

        const projectHeader = document.createElement("h1");
        projectHeader.textContent = currentActiveProject.getProjectName();
        content.appendChild(projectHeader); 

        const todosContainer = document.createElement("div");
        for (const todo of currentActiveProject.getTodos()) {
            const renderedTodo = renderTodo(todo);
            todosContainer.appendChild(renderedTodo);
        }
        todosContainer.classList.add("todos-container"); 
        content.appendChild(todosContainer); 

        const addTodoButton = document.createElement("button");
        addTodoButton.textContent = "Add Todo"
        addTodoButton.classList.add("add-todo"); 
        addTodoButton.addEventListener("click", handleAddTodo)
        content.appendChild(addTodoButton); 
    }

    return { renderSidebar, renderContent };
}

export default initRenderer; 