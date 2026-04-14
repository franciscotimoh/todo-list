function createProject({projectName}) {
    let todoList = [];
    let name = projectName;

    function addTodo(todo) {
        todoList.push(todo); 
    }

    function removeTodo(todo) {
        const index = todoList.indexOf(todo);
        if (index > -1) {
            todoList.splice(index, 1); 
        }
    }

    function updateProjectName(newName) {
        name = newName; 
    }

    function getTodos() {
        const allTodos = todoList.map((todo) => todo.getTodo());
        return allTodos; 
    }

    function getProjectName() {
        return name; 
    }

    function getTodoById(id) {
        const returnedTodo = todoList.find(todo => todo.getTodo().id === id);
        return returnedTodo; 
    }

    return { addTodo, removeTodo, updateProjectName, getTodos, getProjectName, getTodoById };
}

export default createProject; 