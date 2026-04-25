function createTodo({todoTitle, todoDesc, todoDueDate, todoPriority}) {
    const id = crypto.randomUUID(); 
    let title = todoTitle, description = todoDesc, dueDate = todoDueDate, priority = todoPriority, complete = false;

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

    function updateTodo({ title, description, dueDate, priority }) {
        setTitle(title);
        setDescription(description);
        setDueDate(dueDate);
        setPriority(priority);
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