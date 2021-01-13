const { func } = require("@hapi/joi");

function buildMessage(entity, action){
    if(action === 'list'){
        return `${entity}s ${action}ed.`
    }
        return `${entity} ${action}d.`
    
}

module.exports = buildMessage;