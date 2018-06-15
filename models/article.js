var mongoose = require('mongoose');


// User Schema
var ArticleSchema = mongoose.Schema({
	title: {
		type: String,
		index:true
	},
	body: {
		type: String
	}
});


// can use 'Article' in other file
var Article = module.exports = mongoose.model('Article', ArticleSchema);



module.exports.addArticle = function(newArticle, callback){
    newArticle.save(callback);
 
}

module.exports.deleteArticle = function(id, callback){
    // article.(callback);
 
}


// module.exports.saveArticle = function(article_id, callback){
// 	newArticle.save(callback);
	
// 	Article.update(article,function(err,article){
// 		if(err){
// 		  console.log('error occurs when routing to article');
		
// 		}else{
// 		  res.render('article',{article:article});
// 		}
// 	  })
	
 
// }


// module.exports.getUserByUsername = function(username, callback){
// 	var query = {username: username};
// 	User.findOne(query, callback);
// }

// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     	if(err) throw err;
//     	callback(null, isMatch);
// 	});
// }
