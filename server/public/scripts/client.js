$(document).on(onReady);

function onReady(){
    getBookstore();
}

function getBookstore(){
    $.ajax({
        type: 'GET',
        url: '/bookstore'
    }).then(function(arrayFromDatabase){
        render(arrayFromDatabase);
    });
}

function render(){

}