const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllSub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe("Services - movies", function () {
    const moviesServices = proxyquire('../services/movies', {
        '../lib/mongo': MongoLibMock
    });
    const moviesService = new moviesServices();
    describe("When getMovies method is called", async function () {
        it('Shoul call th getAll MongoLib method', async function () {
            await moviesService.getMovies({});
            assert.strictEqual(getAllSub.called, true)
        });

        it("Should return an array of movies", async function () {
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected);

        });
    });
});