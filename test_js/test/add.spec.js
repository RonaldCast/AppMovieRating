/* eslint-disable */

const expect = require('chai').expect
var addUtility = require('../add')

describe('add', function(){
    describe('addUtilily', function(){
        it('should have a sum method', function(){
            expect(addUtility).to.be.an('object');
            expect(addUtility).to.have.property('sum');
        })

        it('addUtility.sum(4,5) should return 9', function(){
            expect(addUtility.sum(5, 4)).to.deep.equal(9)
        })

        it('addUtility.sum(100, 6) should return 106', function(){
            expect(addUtility.sum(100, 6)).to.deep.equal(106)
        })
    })
})




// con la libreria interna de afirmaciones 
/*const addUtility = require('../add.js');
const assert = require('assert')

describe('Add', function(){
    describe('addUtility', function(){
        it('should have a sum method', function(){
            assert.equal(typeof addUtility, "object");
            assert.equal(typeof addUtility.sum, 'function')
        })

        it('addUtility.sum(4,5) should return 9', function(){
            assert.deepEqual(addUtility.sum(5, 4), 9)
        })

    })
})*/


