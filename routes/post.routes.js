 /* 
	localhost:3000/post/<Route>
*/
const Router = require('express').Router(),
	User 	 = require('../model/user.model'),
	Post 	 = require('../model/post.model');

Router.post('/new', (req,res) => {
	if(req.session.user){
		let newpost = new Post;
		newpost.title = req.body.title;
		newpost.description = req.body.description;
		newpost.image = req.body.image;
		newpost.tags = req.body.tags.split(' ').join('').split(',');
		newpost.original_poster = req.session.user._id;
		newpost.save((err,post) => {
			res.redirect('/dashboard');
		})
	}else if(req.user){
		let newpost = new Post;
		newpost.title = req.body.title;
		newpost.description = req.body.description;
		newpost.image = req.body.image;
		newpost.tags = req.body.tags.split(' ').join('').split(',');
		newpost.original_poster = req.user._id;
		newpost.save((err,post) => {
			res.redirect('/dashboard');
		})
	}else{
		res.redirect('/');
	}
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
			errors.push("something went wrong, perhaps this post doesn't exist, see the message below for more information:");
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else if(req.user){
		Post.findOne({_id: req.params.id}).then((post)=>{
			if(String(post.original_poster) === req.user._id){
				post.remove();
				res.redirect('/dashboard');
			}else{
				errors.push('you cannot delete a post that is not yours');
				res.render('errorpage',{errors,});
			}
		}).catch((err)=>{
			errors.push("something went wrong, perhaps this post doesn't exist, see the message below for more information:");
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else{
		res.redirect('/');
	}
})

Router.get('/update/:id',(req,res) =>{
	if(req.session.user){
		let errors = [];
		Post.findOne({_id: req.params.id}).then((post)=>{
			if(String(post.original_poster) === req.session.user._id){
				res.render('update_post',{post,});
			}else{
				errors.push('you cannot edit a post that is not yours');
				res.render('errorpage',{errors,});
			}
		}).catch((err)=>{
			errors.push("something went wrong, perhaps this post doesn't exist, see the message below for more information:");
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else if(req.user){
		let errors = [];
		Post.findOne({_id: req.params.id}).then((post)=>{
			if(String(req.user._id) == post.original_poster){
				res.render('update_post',{post,});
			}else{
				errors.push('you cannot edit a post that is not yours');
				res.render('errorpage',{errors,})
			}
		}).catch((err)=>{
			errors.push("something went wrong, perhaps this post doesn't exist, see the message below for more information:");
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else{
		res.redirect('/');
	}
})



Router.post('/update/:id',(req,res) => {
	if(req.session.user){
		let errors = [];
		Post.findOne({_id: req.params.id}).then((post)=>{
			if(String(post.original_poster) === req.session.user._id){

				post.title = req.body.title || post.title;
				post.description = req.body.description || post.description;
				post.image = req.body.image || post.image;
				post.tags = req.body.tags.split(' ').join('').split(',') || post.tags;
				post.save((error,post) => {
					if(error){
						errors.push("something went wrong, see the message below for more information:");
						errors.push(JSON.stringify(err));
						res.render('errorpage',{errors,});
					}else{
						res.redirect('/dashboard');
					}
				})

			}else{
				errors.push('you cannot edit a post that is not yours');
				res.render('errorpage',{errors,});
			}
		}).catch((err)=>{
			errors.push("something went wrong, perhaps this post doesn't exist, see the message below for more information:");
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else if(req.user){
		let errors = [];
		Post.findOne({_id: req.params.id}).then((post)=>{

			console.log('String(post.original_poster) === req.user_id',String(post.original_poster) === req.user._id)
			console.log('String(post.original_poster) == req.user_id',String(post.original_poster) == req.user._id)

			if(String(req.user._id) == post.original_poster){
				post.title = req.body.title || post.title;
				post.description = req.body.description || post.description;
				post.image = req.body.image || post.image;
				post.tags = req.body.tags.split(' ').join('').split(',') || post.tags;

				post.save((error,post) => {
					if(error){
						errors.push("something went wrong, see the message below for more information:");
						errors.push(JSON.stringify(err));
						res.render('errorpage',{errors,});
					}else{
						res.redirect('/dashboard');
					}
				})

			}else{
				errors.push('you cannot edit a post that is not yours');
				res.render('errorpage',{errors,});
			}
		}).catch((err)=>{
			errors.push("something went wrong, perhaps this post doesn't exist, see the message below for more information:");
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,});
		})
	}else{
		res.redirect('/');
	}
})


module.exports = Router;



