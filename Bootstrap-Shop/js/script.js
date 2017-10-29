var cart={};
var total_price=0;


$( document ).ready(function() {

	$('#category-tab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})
	 
	fillBooks();
	
	$('[data-toggle="popover"]').popover();

	$('.tab-content').on('click','.addToCart', function(e){
		e.preventDefault();
		
		// make add to cart button green and prevent more clicks
		$(this).removeClass('btn-primary').addClass('btn-success');
		this.innerHTML =  `Added to Cart <i class="fa fa-check"></i>`;
		
		id = ($(this).attr('id')).replace('book','');

		if(!cart[id])
	 		cart[id]  = 1;
	 	else 
	 		cart[id]  = cart[id] + 1;
		
		$("#quantity"+id).html(cart[id]);

		$("#quantity"+id).parent().show();
		templateCart();
	});
});

function templateCart(){
	$("#cart").html(`<div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h2 class="modal-title" id="exampleModalLabel">Checkout</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div><div class="modal-body"> <div class="row"> <div class="col"> <label><strong>Book Name</strong></label> </div><div class="col"> <label><strong>Author</strong></label> </div><div class="col"> <label><strong>Cost</strong></label> </div><div class="col"> <label><strong>Quantity</strong></label> </div><div class="col"> <label><strong>Price</strong></label> </div></div><hr> <div id="books"></div><hr> <div class="row"> <div class="col"> <label><strong></strong></label> </div><div class="col"> <label><strong>Total Bill:</strong></label> </div><div class="col"> <label><strong>&#8377; <span id="totalbill"></span></strong></label> </div></div></div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Checkout</button> </div></div></div>`)
	total_price = 0;
	num=0;
	for (var bookid in cart) {
		book = getBookById(bookid)[0];
		total_price = total_price + parseInt(book.price)*cart[bookid];
		num = num + cart[bookid]
		obj = `<div class="row">
	          <div class="col">
	            <label>`+book.title+`</label>    
	          </div>
	          <div class="col">
	            <label>`+book.author+`</label>    
	          </div>
	          <div class="col">
	            <label>`+book.price+`</label>    
	          </div>
	          <div class="col">
	            <label>`+cart[bookid]+`</label>    
	          </div>
	          <div class="col">
	            <label>&#8377; `+parseInt(book.price)*cart[bookid]+`</label>    
	          </div>
	        </div>`;
	     $('#books').prepend(obj);
	 }
     $('#totalbill').html(total_price);
     $('#numBooks').html(num);
}

function getBookById(bookid) {
  return books.filter(
    function(book) {
      if (book.bookid == bookid)
      	return book;
    }
  );
}

function increase_quantity(id){
	cart[id] = cart[id] + 1;
	$("#quantity"+id).html(cart[id]);
	templateCart();
}

function decrease_quantity(id){
	if(cart[id]>1){	
		cart[id] = cart[id] - 1;
		$("#quantity"+id).html(cart[id]);
		templateCart();
	}
	else{
		cart[id] = cart[id] - 1;
		$("#quantity"+id).html(cart[id]);
		templateCart();

		$("#quantity"+id).parent().hide();
		$("#quantity"+id).parent().siblings('.addToCart').removeClass('btn-success').addClass('btn-primary');
		$("#quantity"+id).parent().siblings('.addToCart').html(`Add to Cart <i class="fa fa-cart-plus"></i>`);
	}
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
                <a href="" style="display: block; margin-bottom:15px" class="btn btn-primary addToCart" id="book`+books[i].bookid+`" data-toggle="popover" data-trigger="hover" data-placement="right"  data-html="true" data-content="<strong>Price: `+books[i].price+`<br>GST: `+Math.round(books[i].price * 1.1)+`</strong>">Add to Cart <i class="fa fa-cart-plus"></i></a>
                <div style="display:none" class="change_quantity">
	                <button type="button" class="btn btn-sm btn-danger rounded-circle" onclick="decrease_quantity(`+books[i].bookid+`);"><i class="fa fa-minus" aria-hidden="true"></i></button>
	                <span id="quantity`+books[i].bookid+`" style="margin-left: 5px; margin-right: 5px">0</span>
	                <button type="button" class="btn btn-sm btn-danger rounded-circle" onclick="increase_quantity(`+books[i].bookid+`);"><i class="fa fa-plus" aria-hidden="true"></i></button>
              	</div>
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
		
		var id = Math.round(Math.random()*100)+21;
		var category = categoryName;
		var title = bookname.value;
		var author = "Vishal Gauba";
		var type = "Paperback";
		var rating = "5";
		var price = "350";
		var image = "https://www.babybedding.com/images/fabric/solid-silver-gray-fabric_medium.jpg";
		
		books.push({"bookid":id, "category": category, "title": title, "author": author, "type": type, "rating": rating, "price": price, "image": image})
		
		bookCard = `
		<div class="col">
            <div class="card">
              <img class="card-img-top" style="width:198; height:198" src="`+image+`">
              <div class="card-body">
                <h4 class="card-title" id="book-title">`+title+`</h4>
                <p class="card-text"><span id="book-author">`+author+`</span><br><span id="book-type">`+type+`</span><br><span id="book-rating" style="color:#218838">`+Array(parseInt(rating)).join('<i class="fa fa-star" aria-hidden="true"></i>')+`</span></p>
                <a href="" style="display: block; margin-bottom:15px" class="btn btn-primary addToCart" id="book`+id+`" data-toggle="popover" data-trigger="hover" data-placement="right"  data-html="true" data-content="<strong>Price:`+price+`<br>GST: `+Math.round(price * 1.1)+`</strong>">Add to Cart <i class="fa fa-cart-plus"></i></a>
              	<div style="display:none";class="change_quantity">
	              	<button type="button" class="btn btn-sm btn-danger rounded-circle" onclick="decrease_quantity(`+books[i].bookid+`);"><i class="fa fa-minus" aria-hidden="true"></i></button>
	                <span id="quantity`+books[i].bookid+`" style="margin-left: 5px; margin-right: 5px">0</span>
	                <button type="button" class="btn btn-sm btn-danger rounded-circle" onclick="increase_quantity(`+books[i].bookid+`);"><i class="fa fa-plus" aria-hidden="true"></i></button>
               </div>
             </div>
            </div>
          </div>
		`;
		console.log(bookCard);
		$('#'+categoryName.toLowerCase().replace(" ","-")+'>.container>.row').html( $('#'+categoryName.toLowerCase().replace(" ","-")+'>.container>.row').html()+bookCard );
	});

	$('#category-tab a[href="#'+categoryName+'"]').tab('show');
	$('[data-toggle="popover"]').popover();

}