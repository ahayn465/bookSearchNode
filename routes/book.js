var express = require('express');
var router = express.Router();

/* SEARCH book database*/
router.post('/searchBook', function(req,res){
	var db = req.db;
	var term = req.body.term;

	db.bind('book', {});
	db.book.find({'title':term}).toArray(function(err, items){
		console.log(items[0]);
		res.json(items[0]);

	});
});

/* GET book list. */
router.get('/book', function(req, res) {
    var db = req.db;
    db.collection('book').find().toArray(function (err, items) {
        res.json(items);
    });
});

/* POST to addbook */
router.post('/addBook', function(req,res){
	var db = req.db;
	db.collection('book').insert(req.body, function(err,result){
		res.send(
			(err === null) ? {msg: ''} : {msg:err}
			);
	});
});

/* UPDATE book*/
router.put('/updateBook/:id', function(req,res){
	var db = req.db;
	var bookToUpdate = req.params.id;
	db.collection('book').updateById(bookToUpdate, function(err,result){
		res.send((result === 1) ? {msg: ''} : {msg:'error'+ error});
	});
});

/* DELETE to deleteBook*/
router.delete('/deleteBook/:id', function(req,res){
	var db = req.db;
	var bookToDelete = req.params.id;
	db.collection('book').removeById(bookToDelete, function(err,result){
		res.send((result === 1) ? {msg : ''} : {msg:'error' + err});
	});
});





module.exports = router;
