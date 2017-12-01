# super-duper-computing-machine

TYPE | Route | Explanation
--- | --- | ---
cl  | sten | fen


Models:

```
const UserSchema = {
	facebookid: {  //profile.id
		type: String,
		default: null,
	},
	email: {  //req.body.email
	    type: String,
	    required: true,
	    unique: true,
	},
	username: { //req.body.username
	    type: String,
	    required: true,
	    unique: true,
	},
	password: { //req.body.password
	    type: String,
	    default: null, 
	},
	profile_pic: { type: String }, // req.body.profile_pic
	following:  { type: [String] }, //reference to the username ; req.body.followers (default you're own account created when account is created)
	followers:  { type: [String] }, //reference to the username ; req.body.followers (default you're own account created when account is created)
	posts: {  // created with each new post
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Post'
	},
	timecreated: { //auto created
		type: Date,
		default: Date.now()
	}
})
```

```
let PostSchema = new Schema({
	title: { type: String }, //req.body.title
	description: { type: String }, //req.body.description
	image: { type: String },  //req.body.image
  tags: { type: [String] }, //req.body.tags.split(',')
	original_poster: {  //req.session.user
		type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
	},
	timecreated: { //auto created
		type: Date,
		default: Date.now()
	}
})
```
