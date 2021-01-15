const joi = require('@hapi/joi');

const {movieIdSchema} = require('./movies');
const {userIdSchema}= require('./users');

const userMovieIdSchemna= joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createuserMovieSchema= {
    userId: userIdSchema,
    movieId:movieIdSchema
}

module.exports ={
    userMovieIdSchemna,
    createuserMovieSchema
}