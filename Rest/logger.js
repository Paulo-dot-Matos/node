// we can create middle ware function to put on the req...res pipeline process
// express is nothin more then pipeline middleware between req and res.
function log(req,res,next){ // the next function is mandatory to give continuity to the pipeline flow
    console.log('logging...' );
    next();
}

module.exports = log;