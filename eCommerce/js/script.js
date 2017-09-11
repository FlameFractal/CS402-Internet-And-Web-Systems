$('#category-tab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(function () {
  $('[data-toggle="popover"]').popover()
})

$( document ).ready(function() {
  fillBooks();
});


function fillBooks(){
	for(i=0;i<books.length;i++){
		bookCard = `
		<div class="col" id="book`+books[i].bookid+`">
            <div class="card">
              <img class="card-img-top" src="`+books[i].image+`">
              <div class="card-body">
                <h4 class="card-title" id="book-title">`+books[i].title+`</h4>
                <p class="card-text"><span id="book-author">`+books[i].author+`</span><span id="book-rating"></span></p>
                <a href="#" class="btn btn-primary">Add to Cart <i class="fa fa-cart-plus"></i></a>
              </div>
            </div>
          </div>
		`;
		$('#'+books[i].category+'>.container>.row').html( $('#'+books[i].category+'>.container>.row').html()+bookCard );
	}

}