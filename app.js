const express 	= require('express'),
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	session 	= require('express-session'),
	ejs 		= require('ejs'),
	passport	= require('passport'),
	baseRoutes	= require('./routes/base.routes'),
	userRoutes  = require('./routes/user.routes'),
	localRoutes = require('./routes/local.routes'),
	postRoutes	= require('./routes/post.routes'),
	fbRoutes	= require('./routes/fb.routes'),
	key			= require('./key'),
	app 		= express(),
	db 			= 'mongodb://localhost/' + key.db.local,
	port		= process.env.PORT || 3000;


mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(session({ secret: key.session.secret }));
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());

app.use('/',baseRoutes);
app.use('/local',localRoutes);
app.use('/post',postRoutes);
app.use('/user',userRoutes);
app.use('/auth/facebook',fbRoutes);


app.listen(port,(err) => {
	if(err){
		console.log('err \n',err);
	}else{
		console.log('listening at ' + port);
	}
})


// key.db.remote || 