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

function add_book_inputs(){

	var obj = `<input type="text" class="form-control" id="category-name" style="margin-top:1em;">`
	$('#new_books_add').append(obj);
}

function reset_book_input(){
	$('.new_category').html('<div class="container"> <form> <div class="form-group"> <label for="category-name" class="form-control-label">Category Name</label> <input type="text" class="form-control" id="new_category_name"> </div><div class="form-group"> <label for="message-text" class="form-control-label">Book Names:</label> <div id="new_books_add"> <input type="text" class="form-control" id="category-name"> </div><button type="button" class="btn btn-danger rounded-circle" onclick="add_book_inputs();" data-toggle="popover" data-trigger="hover" data-placement="right" data-html="true" data-content="Click to add more book names!" style="float:right; margin-top:2em; box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2)"><i class="fa fa-plus" aria-hidden="true"></i></button> </div></form> </div>');
}

function add_category(){
	var categoryName = $('#new_category_name').val();
	var obj = `<li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#`+categoryName.toLowerCase().replace(" ","-")+`"><strong>`+categoryName+`</strong></a>
    </li>`;
	$('#category-tab').append(obj);

	obj = `<div id="`+categoryName.toLowerCase().replace(" ","-")+`" class="tab-pane fade" role="tabpanel">
      <br><br><div class="container"><div class="row"></div></div>
    </div>`;
	$(".tab-content").append(obj);

	var bookNames=[];
	$('#new_books_add').children().map(function(index,bookname){
		bookCard = `
		<div class="col">
            <div class="card">
              <img class="card-img-top" style="width:198; height:198" src="https://www.babybedding.com/images/fabric/solid-silver-gray-fabric_medium.jpg">
              <div class="card-body">
                <h4 class="card-title" id="book-title">`+bookname.value+`</h4>
                <p class="card-text"><span id="book-author">Vishal Gauba</span><br><span id="book-type">Hardcover</span><br><span id="book-rating" style="color:#218838">`+Array(parseInt("4")).join('<i class="fa fa-star" aria-hidden="true"></i>')+`</span></p>
                <a href="" class="btn btn-primary addToCart" id="book`+bookname.value.toLowerCase().replace(" ","-")+`" data-toggle="popover" data-trigger="hover" data-placement="right"  data-html="true" data-content="<strong>Price: 350<br>GST: `+Math.round(350 * 1.1)+`</strong>">Add to Cart <i class="fa fa-cart-plus"></i></a>
              </div>
            </div>
          </div>
		`;
		console.log(bookCard);
		$('#'+categoryName.toLowerCase().replace(" ","-")+'>.container>.row').html( $('#'+categoryName.toLowerCase().replace(" ","-")+'>.container>.row').html()+bookCard );
	});

}