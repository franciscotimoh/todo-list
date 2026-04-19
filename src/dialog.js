const projectNameDialog = document.querySelector('#project-dialog');
const projectNameForm = document.querySelector('form.project-name');
const projectNameCancel = document.querySelector('button#cancel-project-name')
const projectNameInput = document.querySelector('input#project-name');

const todoDialog = document.querySelector('#todo-dialog'); 
const todoForm = document.querySelector('form.todo');
const todoHeader = document.querySelector('h4.todo-header'); 
const todoCancel = document.querySelector('button#cancel-todo');
const todoTitleInput = document.querySelector('input.todo-title');
const todoDescInput = document.querySelector('textarea');
const todoDateInput = document.querySelector('input.todo-date');
const todoPriorityInput = document.querySelector('select'); 


export function showProjectDialog() {
    projectNameDialog.showModal();

    return new Promise((resolve) => {
        const handleSubmit = () => {
            resolve(projectNameInput.value);
            projectNameInput.value = "";
            projectNameCancel.removeEventListener("click", handleCancel);
        };

        const handleCancel = () => {
            resolve(null);
            projectNameDialog.close();
            projectNameForm.removeEventListener("submit", handleSubmit); 
        };

        projectNameForm.addEventListener("submit", handleSubmit, { once: true });
        projectNameCancel.addEventListener("click", handleCancel,  { once: true });
    });
}

export function showTodoDialog(existingTodo) {
    if (existingTodo) {
        todoHeader.textContent = "Edit Todo";
        todoTitleInput.value = existingTodo.title; 
        todoDescInput.value = existingTodo.description;
        todoDateInput.value = existingTodo.dueDate;
        todoPriorityInput.value = existingTodo.priority; 
    } else {
        todoHeader.textContent = "New Todo"; 
    }

    todoDialog.showModal();

    return new Promise((resolve) => {
        const handleSubmit = () => {
            const todo = {
                title: todoTitleInput.value,
                description: todoDescInput.value,
                dueDate: todoDateInput.value,
                priority: todoPriorityInput.value,
            };

            resolve(todo);
            todoTitleInput.value = "";
            todoDescInput.value = "";
            todoDateInput.value = "";
            todoPriorityInput.value = "low";
            todoCancel.removeEventListener("click", handleCancel);
        };

        const handleCancel = () => {
            resolve(null);
            todoDialog.close();
            todoForm.removeEventListener("submit", handleSubmit); 
        };

        todoForm.addEventListener("submit", handleSubmit, { once: true });
        todoCancel.addEventListener("click", handleCancel, { once: true });
    });
}