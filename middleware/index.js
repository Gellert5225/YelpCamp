var middlewareObj = {
    checkCGOwnership: function(req, res, next){
        if(req.isAuthenticated())
        {
            Campgrounds.findById(req.params.id, function(err, foundCampground){
                if(err)
                {
                    console.log(err);
                    res.redirect("back");
                }
                else
                {
                    if(foundCampground.author.id.equals(req.user._id))
                    {
                        next();
                    }
                    else
                    {
                        res.redirect("back");
                    }
                }
            });
        }
        else
        {
            res.redirect("back");
        }
    }
};

module.exports = middlewareObj