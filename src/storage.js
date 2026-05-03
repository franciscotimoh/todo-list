export function save(projectList) {
    const projects = projectList.getProjects();
    localStorage.setItem("projectList", JSON.stringify(projects));

    const activeProject = projectList.getActiveProject();
    const activeProjectId = activeProject ? activeProject.getProjectId() : null;
    localStorage.setItem("activeProject", JSON.stringify(activeProjectId));
}

export function load() {
    const projectsJSON = localStorage.getItem("projectList");
    if (!projectsJSON) {
        return null; 
    }

    return {
        projectList: JSON.parse(localStorage.getItem("projectList")),
        activeProjectId: JSON.parse(localStorage.getItem("activeProject")),
    };
}