const express = require('express');
const MoviesService = require('../services/movies');
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SEGUNDOS, SIXTY_MINUTES_IN_SEGUNDOS } = require('../utils/time');
function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies/', router);

    const moviesService = new MoviesService();

    // list movies
    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SEGUNDOS);
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'Movies listed.'
            });
        } catch (error) {
            next(error);
        }
    });

    // list movies :movieId
    router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        cacheResponse(res,SIXTY_MINUTES_IN_SEGUNDOS);
       
        const { movieId } = req.params;
        try {
            const movies = await moviesService.getMovie({ movieId });
            res.status(200).json({
                data: movies,
                message: 'Movie list.'
            });
        } catch (error) {
            next(error);
        }
    });

    // create movie
    router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            const createId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createId,
                message: 'Movies Create.'
            });
        } catch (error) {
            next(error);
        }
    });
    // Actualizar  movie
    router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const updateId = moviesService.updateMovie({ movieId, movie });
            res.status(200).json({
                data: updateId,
                message: 'Muvie updated'
            });
        } catch (error) {
            next(error);
        }
    });

    // Actualizar  movie
    router.patch('/:movieId', async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const patchId = moviesService.updateMovie({ movieId, movie });
            res.status(200).json({
                data: patchId,
                message: 'Muvie patch'
            });
        } catch (error) {
            next(error);
        }
    });

    // elimianr  movie :movieId
    router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const deleteId = moviesService.deleteMovie({ movieId });
            res.status(200).json({
                data: deleteId,
                message: 'Muvie deleted'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;


