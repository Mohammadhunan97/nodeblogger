 /* 
	localhost:3000/post/<Route>
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
	User.findOne({ username: req.params.username }).then((user) => {
		Post.find({ original_poster: user._id }).then((posts) => {
			res.render('profile',{posts,user});
		})
	})
})



module.exports = Router;


