$(document).ready(onReady);

function onReady() {
    getTasks();
    $('.js-btn-add').on('click', addTaskButton);
    $('#container').on('click', '.js-btn-complete', updateTask);
    $('#container').on('click', '.js-btn-delete', deleteTask);
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (arrayFromDatabase) {
        render(arrayFromDatabase);
    });
}

function addTaskButton() {
    const task = $('.task').val();
    const completed = $('.completed').val();

    const taskObject = {
        task,
        completed
    }
    $('.task').val('');
    $('.completed').val('');

    postTask(taskObject);
}

function postTask(taskObject) {
    console.log(taskObject);
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: taskObject
    }).then(function (response) {
        getTasks();
    })
}

function updateTask() {
    const taskId = $(this).parent().data('id');

    $.ajax({
        type: 'PUT',
        url: 'todo/completed/' + taskId // look @ router url
    }).then(function (response) {
        getTasks();
    });
}

function deleteTask() {
    const taskId = $(this).parent().data('id');

    $.ajax({
        type: 'DELETE',
        url: '/todo/delete/' + taskId
    }).then(function (response) {
        getTasks();
    });
}

function render(arrayFromDatabase) {
    $('#container').empty();

    for (let task of arrayFromDatabase) {

        $('#container').append(`
    <div data-id="${task.id}" class="taskDiv">
        <h2>${task.task}</h2>
        <h3>${task.completed}</h3>
        <button class="js-btn-complete">Complete Task</button>
        <button class="js-btn-delete">Delete Task</button>
    </div>
    `);

        if (task.completed == true) {
            const element = $('#container').children().last();
            element.addClass('completed');
        }
    }
}