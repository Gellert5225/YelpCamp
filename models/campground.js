var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name        : String,
    image       : String,
    description : String,
    comments    : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
    }],
    author      : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

//campgroundSchema.pre('remove', function(next) 
//{
//    // Remove all the assignment docs that reference the removed person.
//    this.model('Campground').remove(
//        { comments: this.comments },
//        next
//    );
//});

module.exports = mongoose.model("Campground", campgroundSchema);