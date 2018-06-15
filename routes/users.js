var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{ title: 'Add New User' });
});


// /* GET Userlist page. */
// router.get('/userlist', function(req, res) {
//   var db = req.db;
//   var collection = db.get('users');
//   collection.find({},{},function(e,docs){
//       res.render('userlist', {
//           "userlist" : docs
//       });
//   });
// });

/* GET Login page. */
router.get('/login', function(req, res, next) {
  
  res.render('login');
});

/* POST to Add User Service */
router.post('/register', function(req, res) {
  
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var username = req.body.username;
  // var userEmail = req.body.useremail;
  var password = req.body.userpassword;


  // 	// Validation
	// req.checkBody('username', 'Name is required').notEmpty();
	// // req.checkBody('useremail', 'Email is required').notEmpty();
	// // req.checkBody('useremail', 'Email is not valid').isEmail();
	// req.checkBody('userpassword', 'Password is required').notEmpty();
	
  // var errors = req.validationErrors();
  var errors = null;
  
  if (errors) {
    		res.render('register', {
          title: 'Add New User',
    			errors: errors
    		});
    	}
    	else {
    					var newUser = new User({
    						// name: name,
    						// email: email,
    						username: username,
                password: password,
                admin:true
    					});
    					User.createUser(newUser, function (err, user) {
    						if (err) throw err;
    						console.log(user);
    					});
             	// req.flash('success_msg', 'You are registered and can now login');
    					res.redirect('/users/login');
    				}
  

  // // Submit to the DB
  // collection.insert({
  //     "name" : userName,
  //     "email" : userEmail,
  //     "password" :userpassword
  // }, function (err, doc) {
  //     if (err) {
  //         // If it failed, return error
  //         res.send("There was a problem adding the information to the database.");
          
  //     }
  //     else {
  //         // And forward to success page
  //         res.redirect("/users/login");
          
  //     }
  // });


});




// // Register User
// router.post('/register', function (req, res) {




// 	if (errors) {
// 		res.render('register', {
// 			errors: errors
// 		});
// 	}
// 	else {
	
// 					var newUser = new User({
// 						name: name,
// 						email: email,
// 						username: username,
// 						password: password
// 					});
// 					User.createUser(newUser, function (err, user) {
// 						if (err) throw err;
// 						console.log(user);
// 					});
//          	req.flash('success_msg', 'You are registered and can now login');
// 					res.redirect('/users/login');
// 				}
		
// });


// passport.use(new LocalStrategy(
// 	function (username, password, done) {
// 		User.getUserByUsername(username, function (err, user) {
// 			if (err) throw err;
// 			if (!user) {
// 				return done(null, false, { message: 'Unknown User' });
// 			}

// 			User.comparePassword(password, user.password, function (err, isMatch) {
// 				if (err) throw err;
// 				if (isMatch) {
// 					return done(null, user);
// 				} else {
// 					return done(null, false, { message: 'Invalid password' });
// 				}
// 			});
// 		});
//   }));
  


///user login
router.post('/login',
  function (req, res) {


    var username = req.body.username;
    var password = req.body.userpassword;

    

    User.getUserByUsername(username, function (err, user) {
      			if (err) throw err;
      			if (!user) {
              console.log('cant find user with name :'+username );
              res.render('login',{errors:err});
      			}else{
      			User.comparePassword(password, user.password, function (err, isMatch) {
      				if (err) throw err;
      				if (isMatch) {
      					res.redirect('/?admin='+user.admin);
      				} else {
                console.log('Invalid password');
                res.redirect('/users/login');
      				}
            });
          }
      });
          
  
	});



module.exports = router;
