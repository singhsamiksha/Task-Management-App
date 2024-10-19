const addButton = document.getElementById('addbutton');
const addForm = document.getElementById('add');
const overlay = document.getElementById('overlay');
const taskForm = document.getElementById('taskForm');
const taskArr = [];



addButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    addForm.style.display = 'block';
});

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const dateCreated = new Date().toLocaleDateString();

    const task = document.createElement('div');
    task.classList.add('taskContainer');

    const content = document.createElement('div');
    content.classList.add('content');

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;
    taskDescription.classList.add('description');

    const taskDate = document.createElement('p');
    taskDate.textContent = `Created on: ${dateCreated}`;
    taskDate.classList.add('date');

    const taskPriority = document.createElement('img');
    taskPriority.src = priority === 'high' ? "./images/circle-xxl.png" : 
                       priority === 'medium' ? "./images/circle-xxl (2).png" : 
                       "./images/circle-xxl (1).png";

    const markButton = document.createElement('button');
    markButton.textContent = 'Mark As Completed';
    markButton.classList.add('markButton');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('editButton');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');

    const sideButtons = document.createElement('div');
    sideButtons.append(markButton, editButton, deleteButton);
    sideButtons.classList.add('Buttons');

    content.append(taskTitle, taskPriority);
    task.append( content, taskDate, taskDescription, sideButtons);

    const line = document.createElement('hr');
    line.classList.add('line');

    document.getElementById('todo').append(task, line);
    taskArr.push(task);

    handleOperations(markButton,editButton,deleteButton);

    overlay.style.display = 'none';
    addForm.style.display = 'none';
    taskForm.reset();
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    addForm.style.display = 'none';
});

function handleOperations(markButton, editButton, deleteButton) {
    markButton.addEventListener('click', (event) => {
        event.preventDefault();

        markButton.textContent = 'Completed';
        markButton.style.backgroundColor = 'lightgreen';
        markButton.disabled = true;
        editButton.remove();

        const taskContainer = markButton.closest('.taskContainer');
        const taskIndex = taskArr.indexOf(taskContainer);
        if (taskIndex > -1) {
            taskArr.splice(taskIndex, 1);
            CompletedArr.push(taskContainer);
            completedContainer.append(taskContainer);
        }
    });

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();

        const taskContainer = deleteButton.closest('.taskContainer');
        const line = taskContainer.nextElementSibling; 
        if (line && line.tagName === 'HR') {
            line.remove();  
        }

        taskContainer.remove();  

        const taskIndex = taskArr.indexOf(taskContainer);
        if (taskIndex > -1) {
            taskArr.splice(taskIndex, 1);
        }
    });


    editButton.addEventListener('click',(event)=>{
        event.preventDefault;
        overlay.style.display = 'block';
        addForm.style.display = 'block';
    })
}
