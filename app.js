const express 	= require('express'),
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	session 	= require('express-session'),
	ejs 		= require('ejs'),
	baseRoutes	= require('./base.routes'),
	userRoutes  = require('./user.routes'),
	localRoutes = require('./local.routes'),
	postRoutes	= require('./post.routes'),
	key			= require('./key'),
	app 		= express(),
	db 			= 'mongodb://localhost/computing4',
	port		= process.env.PORT || 3000;


mongoose.connect('localhost','computing4');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(session({ secret: key.session.secret }));
app.use(express.static('public'));
app.set('view engine','ejs');
app.use('/',baseRoutes);
app.use('/local',localRoutes);
app.use('/post',postRoutes);
app.use('/user',userRoutes);


app.listen(port,(err) => {
	if(err){
		console.log('err \n',err);
	}else{
		console.log('listening at http://localhost:' + port);
	}
})


