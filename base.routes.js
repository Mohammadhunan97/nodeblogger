/* 
	localhost:3000/<Route>
*/
const Router = require('express').Router(),
	Post 	 = require('./model/post.model');

Router.get('/',(req,res) => {
	if(req.session.user) {
		res.redirect('/dashboard');
	}else{
		res.render('login', {errors: []});
	}
})

Router.get('/signup',(req,res) => {
	res.render('signup', {errors: []})
})


Router.get('/dashboard',(req,res) => {
	if(req.session.user){
		Post.find({original_poster: req.session.user._id }).sort({date:-1}).populate('original_poster','username').then((posts)=>{
			res.render('dashboard',{posts,})
		});
	}else{
		res.redirect('/');
	}
})


Router.get('/new_post/',(req,res) => {
	if(req.session.user){
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