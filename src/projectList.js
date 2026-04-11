function createProjectList() {
    let projectList = []; 
    let activeProject; 

    function addProject(project) {
        projectList.push(project);
    }

    function removeProject(project) {
        const index = projectList.indexOf(project);
        if (index > -1) {
            projectList.splice(index, 1); 
        }
    }

    function getProjects() {
        const allProjects = projectList.map((project) => {
            return {
                name: project.getProjectName(),
                todos: project.getTodos(),
            };
        });

        return allProjects; 
    }

    function getActiveProject() {
        return activeProject;
    }

    function setActiveProject(project) {
        activeProject = project; 
    }

    return { addProject, removeProject, getProjects, getActiveProject, setActiveProject };
}

export default createProjectList; 