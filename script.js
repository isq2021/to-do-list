const taskInput = document.getElementById('new-task')
const addButton = document.getElementById('add-task')
const listOfIncompletedTasks = document.getElementById('incompleted-tasks')
const listOfCompletedTasks = document.getElementById('completed-tasks')
const createNewTaskElement = function(taskString) {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');


    const editInput = document.createElement('input');
    const label = document.createElement('label');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    label.innerText = taskString;

    checkBox.type = "checkbox";
    editInput.type = 'text';

    editButton.innerText = "Edit";
    editButton.className = "Edit";

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};
const addNewTask = function() {
    const listItem = createNewTaskElement(taskInput.value)
    listOfIncompletedTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskCompleted);
    taskInput.value = "";
};

addButton.addEventListener('click', addNewTask);

const deleteTask = function() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};

const taskCompleted = function() {
    const listItem = this.parentNode;
    taskCompletedTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskInCompleted);

};
const taskInCompleted = function() {
    const listItem = this.parentNode;
    taskInCompletedTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskCompleted);

};

const editTask = function() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector('label');

    const containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = editInput.value
    } else {
        editInput.value = label.innerText;
    }

    listItem.classList.toggle('editMode');
}
const bindTaskEvent = function(taskItem, checkBoxHandler) {
    const checkBox = taskItem.querySelector('input[type=checkbox]');
    const editButton = taskItem.querySelector('button.edit');
    const deleteButton = taskItem.querySelector('button.delete');

    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxHandler;

};
for (let i = 0; i < listOfIncompletedTasks.children.length; i++) {
    bindTaskEvent(listOfIncompletedTasks.children[i], taskCompleted);


}
for (let i = 0; i < listOfCompletedTasks.children.length; i++) {
    bindTaskEvent(listOfCompletedTasks.children[i], taskInCompleted);


}