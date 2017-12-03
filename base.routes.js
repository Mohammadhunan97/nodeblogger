/* 
	localhost:3000/<Route>
*/
const Router = require('express').Router();

Router.get('/',(req,res) => {
	res.render('login', {errors: []})
})

Router.get('/signup',(req,res) => {
	res.render('signup', {errors: []})
})

module.exports = Router;