$(document).ready(onReady);

function onReady() {
    getBookstore();
    $('.js-btn-addBook').on('click', clickAddBook);
    $('#container').on('click', '.js-btn-delete', deleteBook);
    $('#container').on('click', '.book', updateIfRead)
}

function getBookstore() {
    $.ajax({
        type: 'GET',
        url: '/bookstore'
    }).then(function (arrayFromDatabase) {
        render(arrayFromDatabase);
    });
}

function clickAddBook() {
    const title = $('.title').val();
    const author = $('.author').val();
    const published = $('.published').val();

    const bookObject = {
        title,
        author,
        published
    }
    $('.title').val('');
    $('.author').val('');
    $('.published').val('');

    postBook(bookObject);
}

function postBook(bookObject) {
    console.log(bookObject);
    $.ajax({
        type: 'POST',
        url: '/bookstore',
        data: bookObject
    }).then(function (response) {
        getBookstore();
    })
}

function updateIfRead() {
    const bookId = $(this).data('id');

    $.ajax({
        type: 'PUT',
        url: '/bookstore/read/' + bookId
    }).then(function (response) {
        getBookstore();
    });
}

function deleteBook() {
    const bookId = $(this).parent().data('id');
    console.log(bookId);

    $.ajax({
        type: 'DELETE',
        url: '/bookstore/delete/' + bookId
    }).then(function (response) {
        getBookstore();
    });
}

function render(arrayFromDatabase) {
    $('#container').empty();

    for (let book of arrayFromDatabase) {
        let readString = 'I should read this.';
        if (book.read == true) {
            readString = 'I read this.';
        }

        $('#container').append(`
    <div data-id="${book.id}" class="book">
        <h2>${book.title}</h2>
        <h3>${book.author}</h3>
        <h4>${book.published}</h4>
        <button class="js-btn-delete">Delete</button>
    </div>
    `);

        if (book.read == true) {
            const element = $('#container').children().last();
            element.addClass('read');
        }
    }
}