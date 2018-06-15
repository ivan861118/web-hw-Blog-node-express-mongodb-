var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required:true
	},
	password: {
        type: String,
        required:true
    },
    admin:{
        type:Boolean
    }
	// email: {
	// 	type: String
	// },
	// name: {
	// 	type: String
	// }
});
// can use 'User' in other file
var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
    // bcrypt.genSalt(10, function(err, salt) {
	//     bcrypt.hash(newUser.password, salt, function(err, hash) {
	//         newUser.password = hash;
	//         newUser.save(callback);
	//     });
	// });
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }

module.exports.comparePassword = function(candidatePassword,hash,callback){
	// bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    // 	if(err) throw err;
    // 	callback(null, isMatch);
    // });
    var isMatch = false;
    console.log('candidatePassword is '+candidatePassword);
    console.log('hash is '+hash);

    if(candidatePassword == hash){
        isMatch =true;
    }
    callback(null, isMatch);
    
}
