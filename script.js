// Get elements
const addButton = document.getElementById('addbutton');
const addForm = document.getElementById('add');
const overlay = document.getElementById('overlay');
const taskForm = document.getElementById('taskForm');

addButton.addEventListener('click', function() {
    overlay.style.display = 'block';  // Show overlay
    addForm.style.display = 'block';  // Show form
});

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    console.log("Task created with title:", document.getElementById('title').value);

    overlay.style.display = 'none';
    addForm.style.display = 'none';
    taskForm.reset();
});

overlay.addEventListener('click', function() {
    overlay.style.display = 'none';
    addForm.style.display = 'none';
});
