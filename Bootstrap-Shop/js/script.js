var cart=[];
var total_price=0;


$( document ).ready(function() {

	$('#category-tab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})
	 
	fillBooks();
	
	$('[data-toggle="popover"]').popover();

	$('.addToCart').click( function(e) {
		e.preventDefault();
		
		// make add to cart button green and prevent more clicks
		$(this).removeClass('btn-primary').addClass('btn-success');
		this.innerHTML =  `Added to Cart <i class="fa fa-check"></i>`;
		
		bookid = ($(this).attr('id')).replace('book','');
		cart.push(bookid);
		book = getBookById(bookid)[0];
		total_price = total_price + parseInt(book.price);

		obj = `<div class="row">
              <div class="col">
                <label>`+book.title+`</label>    
              </div>
              <div class="col">
                <label>`+book.author+`</label>    
              </div>
              <div class="col">
                <label>&#8377; `+parseInt(book.price)+`</label>    
              </div>
            </div>`;

         $('#books').prepend(obj);
         $('#totalbill').html(total_price);
         $('#numBooks').html(cart.length);

		return false; 
	});

});

function updateModal(){
	$('#books')
}

function getBookById(bookid) {
  return books.filter(
    function(book) {
      if (book.bookid == bookid)
      	return book;
    }
  );
}

function fillBooks(){
	for(i=0;i<books.length;i++){
		bookCard = `
		<div class="col">
            <div class="card">
              <img class="card-img-top" src="`+books[i].image+`">
              <div class="card-body">
                <h4 class="card-title" id="book-title">`+books[i].title+`</h4>
                <p class="card-text"><span id="book-author">`+books[i].author+`</span><br><span id="book-type">`+books[i].type+`</span><br><span id="book-rating" style="color:#218838">`+Array(parseInt(books[i].rating)).join('<i class="fa fa-star" aria-hidden="true"></i>')+`</span></p>
                <a href="" class="btn btn-primary addToCart" id="book`+books[i].bookid+`" data-toggle="popover" data-trigger="hover" data-placement="right"  data-html="true" data-content="<strong>Price: `+books[i].price+`<br>GST: `+Math.round(books[i].price * 1.1)+`</strong>">Add to Cart <i class="fa fa-cart-plus"></i></a>
              </div>
            </div>
          </div>
		`;
		$('#'+books[i].category+'>.container>.row').html( $('#'+books[i].category+'>.container>.row').html()+bookCard );
	}

}

