var express     = require("express");
var Campgrounds = require("../models/campground.js");
var router      = express.Router();

router.get("/campgrounds", function(req,res){
    //get all campgrounds from DB
    Campgrounds.find({}).populate("comments").exec(function(err, campground){
        if(err) {
            console.log("err");
        } else {
            if(req.accepts('html')) {
                res.render("campgrounds/index.ejs", {campgrounds: campground, currentUser: req.user});
            } else {
                res.set('Content-Type','campgrounds/json'); //G
                res.send(200, campground); //H
            }
        }
    });
});

router.post("/campgrounds",isLoggedIn, function(req,res){
    //create a new CG and save to DB
    Campgrounds.create({
        name        : req.body.name,
        image       : req.body.image,
        description : req.body.description,
        author      : {
            id       : req.user._id,
            username : req.user.username
        }
    }, function(err,newCG){
        if(err) {
            console.log(err);
        } else {
            console.log(newCG.author);
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
})

//show more info about CG
router.get("/campgrounds/:id", function(req,res){
    //find CG with provided ID
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            if(req.accepts('html')) {
                res.render("campgrounds/show.ejs", {campground: foundCampground});
            } else {
                res.set('Content-Type','campgrounds/json'); //G
                res.send(200, foundCampground); //H
            }
        }
    });
    //show CG
});

//Edit Route
router.get("/campgrounds/:id/edit", checkCGOwnership, function(req, res){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err) {
            res.redirect("back");
        } else {
            res.render("campgrounds/edit.ejs", {campground : foundCampground});
        }
    });
});

//Update Route
router.put("/campgrounds/:id", checkCGOwnership, function(req, res){
    var CGData = {
        name        : req.body.name,
        image       : req.body.image,
        description : req.body.description
                   }
    Campgrounds.findByIdAndUpdate(req.params.id, CGData, function(err, updatedCG){
        if(err) {
            res.redirect("/campgrounds/" + req.params.id)
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})

//Destroy Route
router.delete("/campgrounds/:id", checkCGOwnership, function(req, res){
    Campgrounds.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", "Failed to find Campground");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

function checkCGOwnership(req, res, next){
    if(req.isAuthenticated()) {
        Campgrounds.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Failed to find Campground");
                res.redirect("/campgrounds");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to perform this action");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
}

module.exports = router;