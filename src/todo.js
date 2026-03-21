function createTodo(title, description, urgent, complete) {
    let todoTitle = title, todoDesc = description, todoUrgent = urgent, todoComplete = complete; 

    // potentially remove

    function getTodo() {
        const fullTodo = { todoTitle, todoDesc, todoUrgent, todoComplete };
        console.log(fullTodo);
        return { todoTitle, todoDesc, todoUrgent, todoComplete }; 
    }

    function displayTodo() {
        console.log(`${todoTitle}, ${todoDesc}, ${todoUrgent ? "Urgent" : "Not Urgent"}, ${todoComplete ? "Complete" : "Incomplete"}`);
    }

    function setTitle(newTitle) {
        todoTitle = newTitle;
    }

    function setDesc(newDesc) {
        todoDesc = newDesc;
    }

    function setUrgent(newUrgent) {
        todoUrgent = newUrgent;
    }

    function setComplete(newComplete) {
        todoComplete = newComplete; 
    }

    return {
        getTodo,
        displayTodo,
        setTitle,
        setDesc,
        setUrgent,
        setComplete,
    }
}

export { createTodo }; 