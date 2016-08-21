var mongoose    = require("mongoose");
var Campgrounds = require("./models/campground.js");
var Comment     = require("./models/comment.js");

var data = [
    {
        name        : "Sample1",
        image       : "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name        : "Sample2",
        image       : "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name        : "Sample3",
        image       : "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB(){
    //remove all campgrounds
    Campgrounds.remove({}, function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("removed campgrounds");
        //create a few campgrounds
//        data.forEach(function(seed){
//            Campgrounds.create(seed, function(err,campground){
//                if(err)
//                {
//                    console.log(err);
//                }
//                else
//                {
//                    console.log("Added CGs");
//                    //Create comments
//                    Comment.create({
//                        text   : "Sample Comment",
//                        author : "Sample Author"
//                    }, function(err, comment){
//                            if(err)
//                            {
//                                console.log(err);
//                            }
//                            else
//                            {
//                                campground.comments.push(comment);
//                                campground.save();
//                                console.log("saved new comment");
//                            }
//                        });
//                }
//            });
//        });
    });
}

module.exports = seedDB;