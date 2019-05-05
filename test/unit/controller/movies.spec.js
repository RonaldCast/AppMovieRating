/* eslint-disable */

const chalk = require('chalk')
console.log(chalk.red("******************************************************************************************"))
const controller = require("./../../../controllers/movies.js")
const Movie = require("./../../../models/Movie.js")
let server = require('./../../../server')
const chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let sinon = require('sinon')
let should = chai.should()
let express =  require('express')

//let app = express();

chai.use(chaiHttp)

describe('controllers.movies', function(){
    it('exists', function(){
        expect(controller).exist
    })
})

describe('/Get movies', () => {
    it('it should send all movies', (done) => {
        var movie1 = {
            name: 'tes1',
            description: 'test1', 
            release_year: '2017',
            genre: 'test'
        }

        var movie2 = {
            name: 'test2',
            description: 'test2',
            release_year: '2018',
            genre: 'test'
        }

        var expectedMovies = [movie1, movie2];
        // simular una funcion 
       sinon.mock(Movie)
            .expects('find')
            .yields('', expectedMovies);

        chai.request('http://localhost:8081')
            .get('/movies')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
            
            expect(res.body).to.eql({
                movies: expectedMovies
            })
            })
        done();
    })
})


// prueba con el method post

describe('POST /movies', () => {
    it('should respond with the movie that was added', (done) => {
        chai.request('http://localhost:8081')
        .post('/movies')
        .send({
             name: 'test1',
             description: 'test1',
             release_year: 2018,
             genre: 'test1'
        })
        .end((err, res) => {
            res.status.should.equal(200)
            res.body.should.be.an('object')
            res.body.should.include.keys(
                '_id', 'name', 'description', 'release_year', 'genre'
            )
        })
        done();
    })
})


























//prueba con controlador dummy_test
/*chai.use(chaiHttp)

function buildResponse(){
    return http_mocks.createResponse(
    {
        eventEmitter: require('events').EventEmitter
    })
} 

describe('controllers.movies', function(){
        it('existe', function(){
        expect(controller).to.exist
})
 })

describe('/Get dummy_test', () => {

    it('it should respond with a name object', (done) => {

        chai.request('http://localhost:8081')
        .get('/dummy_test')
        .end((err, res) => {
           res.should.have.status(200)
            //res.body.should.be.an('object')
        done(); //dummy_test

        }) 

        
    })
})**/



/* para ver se el controlador existe 
describe('controller.movies.js', function(){
    it('exist', function(){
        expect(movies).exist
    })
})*/