const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('Utils - buildMessage', function () {
    describe('When receives na entity and an action', function(){
        it('Shoul return the respective message', function(){
            const result= buildMessage('Movie', 'create');
            const expect = 'Movie created.';
            assert.strictEqual(result, expect);
        });
    });

    describe('When receives an entity and an action ansd is a list', function(){
        it('Should return the respective message with the entity in plural', function (){
            const result = buildMessage('Movie', 'list');
            const expect = 'Movies listed.';
            assert.strictEqual(result, expect);
        })
    })

});