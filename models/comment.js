var mongoose = require("mongoose");

//SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text        : String,
    author      : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

commentSchema.pre('remove', function (next) {
    var comment = this;
    comment.model('Campground').update(
        { comments: comment._id }, 
        { $pull: { comments: comment._id } }, 
        { multi: true }, 
        next);
});

module.exports = mongoose.model("Comment", commentSchema);