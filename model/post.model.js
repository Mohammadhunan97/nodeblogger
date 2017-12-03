const mongoose = require('mongoose'), 
	Schema 	   = mongoose.Schema,
	ObjectId   = Schema.Types.ObjectId;

let PostSchema = new Schema({
	title      : String,
	description: String,
	image      : String,
	tags       : [String],
	original_poster: {  
		type: Schema.Types.ObjectId,
    	ref: 'User',
    	required: true
	}
})



module.exports = mongoose.model('Post',PostSchema);