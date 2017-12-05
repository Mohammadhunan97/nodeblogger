 /* 
	localhost:3000/user/<Route>
*/
const Router = require('express').Router(),
	User 	 = require('./model/user.model'),
	Post 	 = require('./model/post.model');

Router.get('/profile', (req,res) => {
	if(req.session.user){
		res.redirect('/user/profile/'+req.session.user.username);
	}else{
		res.redirect('/');
	}
})

Router.get('/profile/:username',(req,res) =>{
	queryUserIsSessionUser = req.session.user.username === req.params.username;

	User.findOne({ username: req.params.username }).then((user) => {
		Post.find({ original_poster: user._id }).then((posts) => {
			res.render('profile',{posts,user, queryUserIsSessionUser,});
		})
	})
})


Router.get('/settings',(req,res) => {
	if(req.session.user) {
		User.findOne({ username: req.session.user.username }).then((user) => {
			


			Post.find({ original_poster: user._id }).then((posts) => {

				console.log(user);

				console.log(posts);
				res.render('settings',{posts,user,});
			})
		}).catch((err) => {
			console.log(err);
			res.redirect('/');
		 })
	}else{
		res.redirect('/');
	}

})

Router.get('/following/new/:username',(req,res) => {
	let queryUserExists;
	User.findOne({username: req.params.username}).then((user) => {
		queryUserExists = user;
		user.followers.push(req.session.user.username);
		user.save();
	}).then(() => {
		if(queryUserExists) {
			User.findOne({ username: req.session.user.username }).then((user) => {
				user.followings.push(req.params.username);
				user.save();
				res.redirect('/dashboard');
			})
		}else{
			res.redirect('/');
		}
	}).catch((err) => {
		console.log(err);
		res.redirect('/');
	})
})


Router.get('/following/remove/:username',(req,res) => {
	let queryUserExists;
	User.findOne({username: req.params.username}).then((user) => {
		queryUserExists = user;
		let index = user.followers.indexOf(req.session.user.username); //removes follower from their db
		user.followers.splice(index,1);
		user.save();
	}).then(() => {
		if(queryUserExists) {
			User.findOne({ username: req.session.user.username }).then((user) => {
				let index = user.followings.indexOf(req.params.username);
				user.followings.splice(index,1);
				user.save();
				res.redirect('/dashboard');
			})
		}else{
			res.redirect('/');
		}
	})
})

Router.get('/logout',(req,res) =>{
	if(req.session.user) {
		req.session.user = null;
		res.redirect('/');
	}else{
		res.redirect('/');
	}
})

module.exports = Router;















