 /* 
	localhost:3000/post/<Route>
*/
const Router = require('express').Router(),
	User 	 = require('./model/user.model'),
	Post 	 = require('./model/post.model');

Router.post('/new', (req,res) => {
	let newpost = new Post;
	newpost.title = req.body.title;
	newpost.description = req.body.description;
	newpost.image = req.body.image;
	newpost.tags = req.body.tags.split(' ').join('').split(',');
	newpost.original_poster = req.session.user._id;

	newpost.save((err,post) => {
		res.redirect('/dashboard');
	})
})





module.exports = Router;


