module.exports = function(req,res,next){
    // Comes after the auth middleware function so we can:
    if(!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}