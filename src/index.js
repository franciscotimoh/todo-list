import './styles.css';
import createProjectList from './projectList';
import createProject from './project';
import initRenderer from './renderer';

const projectList = createProjectList();

const defaultProject = createProject({ projectName: "Your Project"});

projectList.addProject(defaultProject);

projectList.setActiveProject(defaultProject);

const renderer = initRenderer(projectList);
renderer.renderSidebar();
renderer.renderContent(); 