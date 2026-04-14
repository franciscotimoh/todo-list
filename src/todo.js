function createTodo({todoTitle, todoDesc, todoDueDate, todoPriority, todoComplete}) {
    const id = crypto.randomUUID(); 
    let title = todoTitle, description = todoDesc, dueDate = todoDueDate, priority = todoPriority, complete = todoComplete;

    function setTitle(newTitle) {
        title = newTitle; 
    }

    function setDescription(newDesc) {
        description = newDesc;
    }

    function setDueDate(newDueDate) {
        dueDate = newDueDate; 
    }

    function setPriority(newPriority) {
        priority = newPriority; 
    }

    function setComplete(newComplete) {
        complete = newComplete;
    }

    function updateTodo({ newTitle, newDesc, newDueDate, newPriority }) {
        setTitle(newTitle);
        setDescription(newDesc);
        setDueDate(newDueDate);
        setPriority(newPriority);
    }

    function getTodo() {
        return {
            id,
            title,
            description,
            dueDate,
            priority,
            complete
        };
    }

    return { getTodo, updateTodo, setComplete };
}

export default createTodo; 