const assert = require('assert');
const proxyquire = require('proxyquire');
const { moviesMock, MoviesServicesMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer'); 



describe('routes - movies', function () {
    const route = proxyquire('../routes/movies',{
        '../services/movies': MoviesServicesMock
    });

    const request = testServer(route);
    describe('GET /movies', function () {
        it('Should response with status 200', function (done) {
            request.get('/api/movies').expect(200,done);
        });
        it('Should response with list of movies', function (done) {
            request.get('/api/movies').end((err,res)=>{
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'Movies listed.'
                }); 
                done();
            });
        });
    });
    describe('POST /movies', function () {
        it('Should response with status 200', function (done) {
            request.get('/api/movies').expect(200,done);
        });
        it('Should response with list of movies', function (done) {
            request.get('/api/movies').end((err,res)=>{
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'Movies listed.'
                }); 
                done();
            });
        });
    });
});