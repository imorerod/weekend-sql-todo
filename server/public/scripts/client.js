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

}

function render(){

}