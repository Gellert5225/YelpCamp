var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user.js");

router.get("/", function(req,res){
    res.render("landing.ejs");
});

//AUTH ROUTES
//show the register form
router.get("/register", function(req, res){
    res.render("register.ejs");
});

//sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Hi " + newUser.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login.ejs");
});

//log in logic
//router.post("/login", passport.authenticate("local", {
//        successRedirect : "/campgrounds",
//        failureRedirect : "/login"
//    }), function(req, res){
//});

router.post("/login", passport.authenticate("local", {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }), function(err, user, info) {
            if (err)
                return next(err);
            if(!user)
                return res.status(400).json({SERVER_RESPONSE: 0, SERVER_MESSAGE: "Wrong Credentials"});
            req.logIn(user, function(err) {
                if (err)
                    return next(err);
                if (!err)
                    return res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!" });
                
            });
        })(req, res);

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = router;