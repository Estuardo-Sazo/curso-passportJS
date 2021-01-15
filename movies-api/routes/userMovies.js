const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createuserMovieSchema } = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router);
  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });
        res.status(200).json({
          data: userMovies,
          message: 'User movies listed.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createuserMovieSchema),
    async function (req, res, next) {
      const { body: userMovie } = req;

      try {
        const userMovieId = await userMoviesService.createUserMovie({
          userMovie,
        });
        res.status(200).json({
          data: userMovieId,
          message: 'User movie Deleted.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { userMovieId } = req.params;

      try {
        const deletedId = await userMoviesService.deleteuserMovie({
            userMovieId,
        });
        res.status(200).json({
          data: deletedId,
          message: 'User movie Created.',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userMoviesApi;