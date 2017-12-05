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
	},
	date: {
		type: Date,
		default: Date.now
	}
})



module.exports = mongoose.model('Post',PostSchema);

