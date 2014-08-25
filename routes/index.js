var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Book Search' });
});


/* POST to add book*/
router.post('/addbook', function(req,res) {
	//set the internal db variable
	var db = req.db;

	//Get the form values, reliant on the name attribute
	var title = req.body.title;
	var isfiction = req.body.isfiction;
	var afname = req.body.afname;
	var alname = req.body.alname;
	var apseudo = req.body.apseudo;
	var isbn = req.body.isbn;
	var pubdate = req.body.pubdate;
	var publisher = req.body.publisher
	var blanguage = req.body.blanguage;
	var editor = req.body.editor;

	//set the collection
	var collection = db.get('book');

	//submit to the db
	collection.insert({
		"title" : title, 
		"isfiction" : isfiction,
		"afname" : afname,
		"alname" : alname,
		"apseudo" : apseudo,
		"isbn" : isbn,
		"pubdate" : pubdate,
		"publisher" : publisher,
		"blanguage" : blanguage, 
		"editor" : editor
		}, function (err,doc){
			if (err){
				//if failed return error
				res.send("There was a problem adding the book, please try again")
			}
			else {
				
				//If it worked set the header
				res.location('add');
				//and forward 
				res.redirect('library');
			}
		});

});



//leave this as the last line
module.exports = router;
