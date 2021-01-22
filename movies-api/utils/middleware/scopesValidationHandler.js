const boom= require('@hapi/boom');

function scopesValidationHandler(allowedSpopes){
    return function(req, res, next){
        if(!req.user || (req.user && !req.user.scopes)){
           next(boom.unauthorized('Missinf scopes')); 
        }

        const hasAccess = allowedSpopes
                        .map(allowedSpope => req.user.scopes.includes(allowedSpope))
                        .find(allowed => Boolean(allowed));

        if(hasAccess){
            next();
        }  else {
            next(boom.unauthorized('Insufficient scopes'));
        }               
    }
}

module.exports = scopesValidationHandler;