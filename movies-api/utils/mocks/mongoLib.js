const sinon = require('sinon');
const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllSub= sinon.stub();
getAllSub.withArgs('movies').resolves(moviesMock);

const tagQuery={tags: { $in:["Drama"]}};
getAllSub.withArgs('movies',tagQuery).resolves(filteredMoviesMock("Drama"));

const createSub= sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock{
    getAll(collection, query){
        return getAllSub(collection,query);
    }

    create(collection, data){
        return createSub(collection,data);
    }

}

module.exports= {
    getAllSub,
    createSub,
    MongoLibMock
}