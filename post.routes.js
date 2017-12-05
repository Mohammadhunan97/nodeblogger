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


Router.get('/remove/:id',(req,res) => {
	if(req.session.user){
		let errors = [];

		Post.findOne({_id: req.params.id}).then((post)=>{
			if(String(post.original_poster) === req.session.user._id){
				post.remove();
				res.redirect('/dashboard');
			}else{
				errors.push('you cannot delete a post that is not yours');
				res.render('errorpage',{errors,});
			}
		}).catch((err)=>{
			errors.push('something went wrong');
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else{
		res.redirect('/');
	}

})


module.exports = Router;


