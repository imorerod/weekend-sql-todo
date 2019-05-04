$(document).ready(onReady);

function onReady() {
    getTasks();
    $('.js-btn-add').on('click', addTaskButton);
    // $('#container').on('click', '.js-btn-delete', deleteBook);
    // $('#container').on('click', '.book', updateIfRead)
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

// function updateIfRead() {
//     const bookId = $(this).data('id');

//     $.ajax({
//         type: 'PUT',
//         url: '/bookstore/read/' + bookId
//     }).then(function (response) {
//         getBookstore();
//     });
// }

// function deleteBook() {
//     const bookId = $(this).parent().data('id');
//     console.log(bookId);

//     $.ajax({
//         type: 'DELETE',
//         url: '/bookstore/delete/' + bookId
//     }).then(function (response) {
//         getBookstore();
//     });
// }

function render(arrayFromDatabase) {
    $('#container').empty();

    for (let task of arrayFromDatabase) {
        let taskString = 'I have not completed this.';
        if (task.completed == true) {
            readString = 'I completed this.';
        }

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