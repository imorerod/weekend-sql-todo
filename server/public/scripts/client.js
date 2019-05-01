$(document).on(onReady);

function onReady(){
    getBookstore();
    $('js-btn-addBook').on('click', clickAddBook);
}

function getBookstore(){
    $.ajax({
        type: 'GET',
        url: '/bookstore'
    }).then(function(arrayFromDatabase){
        render(arrayFromDatabase);
    });
}

function clickAddBook(){
    const title = $('title').val();
    const author = $('address').val();
    const published = $('published').val();

    const bookObject = {
        title,
        author,
        published
    }

    postBook(bookObject);
}

function postBook(bookObject){
    $.ajax({
        type: 'POST',
        url: '/bookstore',
        data: bookObject
    }).then(function(response){
        getBookstore();
    })
}



function render(){

}