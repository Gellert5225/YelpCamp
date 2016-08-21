var express     = require("express");
var Campgrounds = require("../models/campground.js");
var Comment     = require("../models/comment.js");
var router      = express.Router();

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campgrounds.findById(req.params.id, function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new.ejs", {campground : campground});
        }
    });
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        else
        {
            Comment.create({
                text   : req.body.text,
            }, function(err, comment){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        foundCampground.comments.push(comment);
                        foundCampground.save();
                        console.log(comment);
                        res.redirect("/campgrounds/" + foundCampground._id);
                    }
                });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        else
        {
            console.log(req.params);
            res.render("comments/edit.ejs", {comment : foundComment, campground_id : req.params.id});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
    var CommentData = {
        text        : req.body.text,
                 }
    Comment.findByIdAndUpdate(req.params.comment_id, CommentData, function(err, updatedComment){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            console.log(updatedComment);
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err)
            {
                req.flash("error", "Failed to find comment");;
                res.redirect("back");
            }
            else
            {
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You don't have permission to perform this action");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "Please login first");
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = router;