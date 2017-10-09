var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');

var Product = require('../models/product');
	console.log(Product.length);
//var Order = require('../models/order');

/* GET home page. */
//define routes

router.get('/', function(req, res){
  res.render('index');
});

router.post('/proceed', function(req, res){
  console.log('Proceed clicked');
  var guestUser = req.body.guestUser;
  //console.log('user : ' + guestUser);
  res.render('welcome', {userName: guestUser});
});

router.get('/welcome', function(req, res){
  res.render('welcome');
});

router.get('/about', function(req, res){
  res.render('about');
});

router.get('/contact', function(req, res){
  res.render('contact');
});


router.post('/cardmall', function(req, res, next) {
  console.log('cardmall clicked....');
  console.log(Product.length);
  /*******************/
  var MongoClient = require('mongodb').MongoClient;
	//var url = "mongodb://localhost:27017/cartmandb";
	var url = "mongodb://paraskumarsharma:BiKJM6Mixwla9GIbVxPfHcqLqHaFkcJUPsPnXqDcL3eDziRhdd1cvTv8k8TT9OSB2meXMRyS8EX9pXWW6wwmnQ==@paraskumarsharma.documents.azure.com:10255/cartmandb?ssl=true&replicaSet=globaldb";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		db.collection("creditcards").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result.length);
			db.close();
			res.render('cardmall', {
				products: result
			});
		});
	});
  
  
  
  /*Product.getData(function(err, data){
    if (err) {
      return res.redirect('/cardmall');
    }
	console.log('data: ');
	console.log(data.length);
	  res.render('cardmall', {
		products: data
		});
  });
  res.render('cardmall', {
      products: Product
    });*/
  });


router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/cardmall');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/cardmall');
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  res.render('shop/checkout', {
    total: cart.totalPrice,
    noError: !errMsg
  });
});


module.exports = router;

function isLoggedIn(req, res, next) {
  console.log('is authenticated');
    return next();

}
