$(document).ready(onReady);

function onReady() {
    getBookstore();
    getMagazineList();
    $('.js-btn-addBook').on('click', clickAddBook);
    $('.js-btn-addMagazine').on('click', clickAddMagazine);
}

function getBookstore() {
    $.ajax({
        type: 'GET',
        url: '/bookstore'
    }).then(function (arrayFromDatabase) {
        render(arrayFromDatabase);
    });
}

function getMagazineList(){
    $.ajax({
        type: 'GET',
        url: '/magazine'
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

function render(arrayFromDatabase) {
    $('#container').empty();
    for (let book of arrayFromDatabase) {
        $('#container').append(`
    <div>
        <h2>${book.title}</h2>
        <h3>${book.author}</h3>
        <h4>${book.published}</h4>
    </div>
    `);
    }
}