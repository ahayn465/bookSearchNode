
//Booklist data array for filling info box
var bookListData = [];

//DOM ready ===========================================
$(document).ready(function() {
	//populate the user table on initial page load
	populateTable();

	//on click search button
	

 $('#btnSearch').click(function(){
 		var tableContent = "";
		var searchTerm = $('#inputSearch').val();
		$.ajax({
		type: "POST",
		data: {
			term: searchTerm,
		}, 
		url: '/book/searchBook',
		dataType: "JSON"
		}).done(function(response){


			tableContent += '<tr>';
			tableContent += '<td>' + response.title + '</td>';
			tableContent += '<td><a href="#" id=linkDeleteBook rel="' + response._id + '">delete</a><br><a href="#" rel="' + response._id + '">update</a><br><a href="" id="linkShowInfo" rel="' + response._id + '">info</a></td>';
			tableContent += '</tr>';

		//inject the whole content string into our existing table
		$('#bookList table tbody').html(tableContent);

		});


	});


	//on click info button for a book
	$('#bookList table tbody').on('click', 'td a#linkShowInfo', showBookInfo);

	//on clikc delete for a book
	$('#bookList table tbody').on('click', 'td a#linkDeleteBook', deleteBook);

	//on click add book
	$("#addButton").click(function() {
	$('#bookList').fadeOut('fast');
	$("#formAddBook").show();
	});

	//on click close info for book
	$("#btnHideInfo").click(function(){
	$('#bookInfo').fadeOut('slow');
	$('#bookList').fadeIn('fast');
	populateTable();
	});

	//on click update info for book
	$().click(function (){
	updateBook();	
	});

//Functions ===========================================

//Fill table with entire library data
function populateTable() {
	//empty content string
	var tableContent = "";

	//jQuery AJAX call for JSON
	$.getJSON( '/book/book', function( data ){
		bookListData = data;
		//for each item in our JSON, add a table row and cells to 
		//the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.title + '</td>';
			tableContent += '<td><a href="#" id=linkDeleteBook rel="' + this._id + '">delete</a><br><a href="#" rel="' + this._id + '">update</a><br><a href="" id="linkShowInfo" rel="' + this._id + '">info</a></td>';
			tableContent += '</tr>';
		});

		//inject the whole content string into our existing table
		$('#bookList table tbody').html(tableContent);
	});
};

//Fill table with search data

// /End Sill Search Data

// Add book
$('#btnSubmit').click(function(){

	//basic validation-checking for empty fields
	var errorCount = 0;
	$('#addBook input').each(function(index, val){
		if($(this).val() === '') {errorCount++;}
	});

	if(errorCount === 0){

	//If there are no empty fields
	var newBook = {
		"title": $('#inputTitle').val(),
		"isfiction": $('#inputIsFiction').val(),
		"afname": $('#inputAthorFirst').val(),
		"alname": $('#inputAthorLast').val(),
		"apseudo": $('#inputAuthorPseudo').val(),
		"isbn": $('#inputIsbn').val(),
		"pubdate": $('#inputPubDate').val(),
		"publisher": $('#inputPublisher').val(),
		"blanguage": $('#inputLanguage').val(),
		"editor": $('#inputEditor').val(),
	}

	//use AJAX to post the object to our addbook service
	$.ajax({
		type: "POST",
		data: newBook, 
		url: '/book/addBook',
		dataType: "JSON"
	}).done(function(response){
		//check for successful (blank error message) response
		if (response.msg===''){
			//clear the form inputs
			$('#addBook fieldset input').val('');

			//update the table
			populateTable();
		}
		else {
			//if something goes wrong
			alert("Error " + response.msg);
			}
		});
	}

	else{
		//if errorCount is more than 0
		alert("Please fill in all the form fields")
		return false;
	}
});


// Show bookinfo

function showBookInfo(event)
{
	$('#bookList').fadeOut('slow');
	$('#bookInfo').show("slow");

	event.preventDefault();
	//console.log(this);
	var thisBookId = $(this).attr('rel');
	var arrayPosition = bookListData.map(function(arrayItem){
		return arrayItem._id;}).indexOf(thisBookId);

	console.log(thisBookId);
	
	//get the user object
	var thisBookObject = bookListData[arrayPosition];

	//populate info box
	$('#bookFiction').text(thisBookObject.isfiction);
	$('#bookAuthorFirst').text(thisBookObject.afname);
	$('#bookAuthorLast').text(thisBookObject.alname);
	$('#bookAuthorPseudo').text(thisBookObject.apseudo);
	$('#bookIsbn').text(thisBookObject.isbn);
	$('#bookPubDate').text(thisBookObject.pubdate);
	$('#bookPublisher').text(thisBookObject.publisher);
	$('#bookLanguage').text(thisBookObject.blanguage);
	$('#bookEditor').text(thisBookObject.editor);


}
// / End showBookInfo

// DeleteBook
function deleteBook(event){
	event.preventDefault();

	//pop up confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this book?');
	//console.log($(this).attr('rel'));
	if(confirmation === true){
		$.ajax({
			type: 'DELETE',
			url: "book/deleteBook/" + $(this).attr('rel')
		}).done(function(response){
			//check for asuccessful (blank) response
			if (response.msg === ''){

			}
			else {
				alert('Error: ' + response.msg);
			}
			//update the table
			populateTable();
		});
	}
	else{
		//if they did not confirm the delete
		return false;
	}
};

// /END deleteBook


// Update book AAAAAAH THIS DOES NOTHING CAUSE ITS TERRIBLE COPY PASTE!!!!!
	
function updateBook(event){
	event.preventDefault();

	//pop up confirmation dialogue
	var confirmation = confirm("Do you want to edit this book?");
	if(confirmation === true){
		$ajax({
			type: 'PUT', 
			url: "book/updateBook/" + $(this).attr('rel')
		}).done(function(response){
			if(response.msg === ''){

			}
			else{
				alert('Error '+response.msg);
			}
		});
	}
	else{
		return false;
	}
};
// /END update book


//end DOM ready ===================================
});








