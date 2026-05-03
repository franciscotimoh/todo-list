import './styles.css';
import createProjectList from './projectList';
import createProject from './project';
import createTodo from './todo';
import initRenderer from './renderer';
import { load } from './storage'; 

const projectList = createProjectList();
const localStorageData = load();

if (localStorageData) {
    for (const localStorageProject of localStorageData.projectList) {
        const existingProject = createProject({ projectName: localStorageProject.name, projectId: localStorageProject.id });
        if (localStorageData.activeProjectId === localStorageProject.id) {
            projectList.setActiveProject(existingProject); 
        }
        
        for (const localStorageTodo of localStorageProject.todos) {
            const existingTodo = createTodo({
                title: localStorageTodo.todoTitle,
                description: localStorageTodo.todoDesc,
                dueDate: localStorageTodo.todoDueDate,
                priority: localStorageTodo.todoPriority,
                complete: localStorageTodo.todoComplete,
                todoId: localStorageTodo.id,
            });

            existingProject.addTodo(existingTodo); 
        }

        projectList.addProject(existingProject);
    }
} else {
    const defaultProject = createProject({ projectName: "Your Project"});
    projectList.addProject(defaultProject);
    projectList.setActiveProject(defaultProject);
}

const renderer = initRenderer(projectList);
renderer.renderSidebar();
renderer.renderContent(); 