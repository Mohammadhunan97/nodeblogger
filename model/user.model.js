const mongoose = require('mongoose'), 
	Schema 	   = mongoose.Schema,
	ObjectId   = Schema.Types.ObjectId;

let UserSchema = new Schema({
	facebookid : String,
	password   : String,
	profile_pic: String,
	followings  : [String],
	followers  : [String],
	username: {
	    type: String,
	    required: true,
	    unique: true,
	},
	posts: {
	    type: ObjectId,
	    ref : 'Post'
	}
})


module.exports = mongoose.model('User',UserSchema);


