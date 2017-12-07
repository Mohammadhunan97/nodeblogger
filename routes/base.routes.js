/* 
	localhost:3000/<Route>
*/
const Router = require('express').Router(),
	User 	 = require('../model/user.model'),
	Post 	 = require('../model/post.model');


Router.get('/',(req,res) => {
	if(req.session.user || req.user) {
		res.redirect('/dashboard');
	}else{
		res.render('login', {errors: []});
	}
})

Router.get('/signup',(req,res) => {
	if(req.session.user || req.user){
		res.redirect('/dashboard');
	}else{
		res.render('signup', {errors: []});
	}
})


Router.get('/dashboard',(req,res) => {
	let errors = [];
	if(req.session.user){
		let usr_ids = [];
		User.find({ username: { $in: req.session.user.followings } }).then((usrs) =>{
			usrs.forEach((usr) => {
				usr_ids.push(usr._id);
			})
		}).then(() =>{
			Post.find({ original_poster: { $in : usr_ids }}).populate('original_poster',['username']).then((posts) => {
		 		res.render('dashboard',{posts,})
			})
		})
		.catch((err) => {
			errors.push('something went wrong, see below for more information');
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,})
		});
		
	}else if(req.user){
		let usr_ids = [];
		User.find({ username: { $in: req.user.followings } }).then((usrs) =>{
			usrs.forEach((usr) => {
				usr_ids.push(usr._id);
			})
		}).then(() =>{
			Post.find({ original_poster: { $in : usr_ids }}).populate('original_poster',['username']).then((posts) => {
		 		res.render('dashboard',{posts,})
			})
		})
		.catch((err) => {
			errors.push('something went wrong, see below for more information');
			errors.push(JSON.stringify(err));
			res.render('errorpage',{errors,})
		});
	}else{
		res.redirect('/');
	}
})


Router.get('/new_post/',(req,res) => {
	if(req.session.user || req.user){
		res.render('new_post');
	}else{
		res.redirect('/');
	}
})


Router.get('/search',(req,res) =>{
	res.render('search',{posts: []});
})


Router.get('/search/:tag',(req,res) => {
	Post.find({ tags: req.params.tag }).populate('original_poster','username').then((posts) => {
		res.render('search',{posts,})
	})
})

module.exports = Router;