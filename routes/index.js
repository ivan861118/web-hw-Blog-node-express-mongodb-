var express = require('express');
var router = express.Router();
var Article = require('../models/article');



router.get('/', function(req, res, next) {
  // var admin = req.query.admin;
  Article.find({},function(err, articles){
    if(err){
      console.log('error when getting data from db !');
    }else{
      res.render('main', { 
        title: '部落格首頁',
        articles:articles ,
      });
      
      
    }

  });
  
  
});


//jump to "add new article" page
router.post('/', function(req, res, next) {
      
    res.redirect('/add_article');

});

router.get('/add_article', function(req, res, next) {
      
  res.render('add_article');

});

//add new article, submit to db 
router.post('/add_article', function(req, res, next) {
  var title = req.body.title;
  var body = req.body.body;

  var newArticle = new Article({
    title: title,
    body: body
  });
  console.log('new article is sent to db :'+newArticle);
  Article.addArticle(newArticle, function (err) {
    if (err) {throw err;
    }else{
      console.log('add new article succeed !!!');
      res.redirect('/');
    }  
  });

});


//click on specific article and route to it
router.get('/article/:id',function(req, res){
 
  Article.findById(req.params.id,function(err,article){
    if(err){
      console.log('error occurs when routing to article');
    
    }else{
      res.render('article',{article:article});
    }
  })

 });


// //delete article
// router.post('/article/delete/:id', function(req, res) {
//   let article ={};

//   let query ={_id:req.params.id} ;


//   Article.findById(query, function(err, article){
//     if(err)throw err;

//     Article.remove(query, function(err){
//         if(err){
//           console.log(err);
//         } else{
//         res.send('Success');
//         res.redirect('/');
//         }
      
//     });
//   });


// });

router.post('/article/:id', function(req, res) {
  console.log(req.body);
  let article ={};
  article.title=req.body.title;
  article.body =req.body.body;
  // console.log('update article to :'+req.body.body);

  let query ={_id:req.params.id} ;

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });

});










// /* POST to Add User Service */
// router.post('/register', function(req, res) {

//   // Set our internal DB variable
//   var db = req.db;

//   // Get our form values. These rely on the "name" attributes
//   var userName = req.body.username;
//   var userEmail = req.body.useremail;

//   // Set our collection
//   var collection = db.get('usercollection');

//   // Submit to the DB
//   collection.insert({
//       "username" : userName,
//       "email" : userEmail
//   }, function (err, doc) {
//       if (err) {
//           // If it failed, return error
//           res.send("There was a problem adding the information to the database.");
//       }
//       else {
//           // And forward to success page
//           res.redirect("userlist");
//       }
//   });
// });


module.exports = router;
