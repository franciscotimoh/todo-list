function createTodo({title, description, dueDate, priority}) {
    const id = crypto.randomUUID(); 
    let todoTitle = title, todoDesc = description, todoDueDate = dueDate, todoPriority = priority, todoComplete = false;

    function setTitle(newTitle) {
        todoTitle = newTitle; 
    }

    function setDescription(newDesc) {
        todoDesc = newDesc;
    }

    function setDueDate(newDueDate) {
        todoDueDate = newDueDate; 
    }

    function setPriority(newPriority) {
        todoPriority = newPriority; 
    }

    function setComplete(newComplete) {
        todoComplete = newComplete;
    }

    function updateTodo({ title, description, dueDate, priority }) {
        setTitle(title);
        setDescription(description);
        setDueDate(dueDate);
        setPriority(priority);
    }

    function getTodo() {
        return {
            id,
            todoTitle,
            todoDesc,
            todoDueDate,
            todoPriority,
            todoComplete
        };
    }

    return { getTodo, updateTodo, setComplete };
}

export default createTodo; 