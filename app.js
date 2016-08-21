var Campgrounds    = require("./models/campground.js");
var Comment        = require("./models/comment.js");
var User           = require("./models/user.js");
var methodOverride = require("method-override");
var LocalStrategy  = require("passport-local");
var flash          = require("connect-flash");
var bodyParser     = require("body-parser");
var seedDB         = require("./seeds.js");
var mongoose       = require("mongoose");
var passport       = require("passport");
var express        = require("express");
var app            = express();

var commentRoutes     = require("./routes/comments.js");
var campgroundsRoutes = require("./routes/campgrounds.js");
var indexRoutes       = require("./routes/index.js");

//create a database
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://gellert:5917738ljh@ds013366.mlab.com:13366/yelpcamp");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(flash());

//seedDB();

//passport config
app.use(require("express-session")({
    secret            : "Once again",
    resave            : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.errorFlash   = req.flash("error");
    res.locals.successFlash = req.flash("success");
    next();
});
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundsRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT || 5000);