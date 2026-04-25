import { showProjectDialog, showTodoDialog } from "./dialog";
import createProject from "./project";
import createTodo from "./todo";

function initEventHandlers(projectList, renderer) {
    // Project handlers
    async function handleAddProject() {
        const projectName = await showProjectDialog();

        if (!projectName) {
            return; 
        }

        const project = createProject({ projectName });
        projectList.addProject(project);
        renderer.renderSidebar(); 
    }

    function handleSetActiveProject(e) {
        const sidebarItem = e.target.parentElement; 
        const project = projectList.getProjectById(sidebarItem.dataset.id);
        projectList.setActiveProject(project);
        renderer.renderSidebar();
        renderer.renderContent(); 
    }
    
    function handleRemoveProject(e) {
        const sidebarItem = e.target.parentElement;
        const project = projectList.getProjectById(sidebarItem.dataset.id); 
        if (project === projectList.getActiveProject()) {
            projectList.setActiveProject(null);
        }

        projectList.removeProject(project);
        renderer.renderSidebar();
        renderer.renderContent(); 
    }

    // Todo handlers
    async function handleAddTodo() {
        const todoMetadata = await showTodoDialog();
        if (!todoMetadata) {
            return; 
        }

        const todo = createTodo(todoMetadata);
        projectList.getActiveProject().addTodo(todo);
        renderer.renderContent(); 
    }

    async function handleEditTodo(e) {
        const todoItem = e.target.parentElement; 
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id); 
        
        const todoMetadata = await showTodoDialog(todo.getTodo());
        if (!todoMetadata) {
            return; 
        }

        todo.updateTodo(todoMetadata);
        renderer.renderContent(); 
    }

    function handleToggleComplete(e) {
        const todoItem = e.target.parentElement;
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id); 
        const currentComplete = todo.getTodo().complete;
        todo.setComplete(!currentComplete);
    }

    function handleRemoveTodo(e) {
        const todoItem = e.target.parentElement;
        const todo = projectList.getActiveProject().getTodoById(todoItem.dataset.id); 
        projectList.getActiveProject().removeTodo(todo);
        renderer.renderContent(); 
    }

    return {
        handleAddProject,
        sidebarHandlers: {
            handleSetActiveProject,
            handleRemoveProject,
        },
        contentHandlers: {
            handleAddTodo,
            handleEditTodo,
            handleToggleComplete,
            handleRemoveTodo,
        },
    };
}

export default initEventHandlers; 