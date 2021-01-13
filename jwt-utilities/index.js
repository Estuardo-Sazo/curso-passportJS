const jwt = require('jsonwebtoken');

const [, , option, secret, nameOrToken]= process.argv;

if(!option || !secret || !nameOrToken){
    return console.log('Mission arguments');
}

//Firmar token
function signToken(payload, secret){
    return jwt.sign(payload, secret);
}

// Verificar token
function verifyToken(token, secret){
    return jwt.verify(token, secret);
}

if(option === 'sign'){
    console.log(signToken({sub: nameOrToken}, secret));
}else if(option === 'verify')
{
console.log(verifyToken(nameOrToken,secret));
}else{
    console.log('Option needs to "sign" or "verify"');
}