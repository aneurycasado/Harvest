// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Order = mongoose.model('Order');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Orders Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

  var loggedInAgent;

  var userInfo = {
    email: 'joe@gmail.com',
    password: 'shoopdawoop'
  };
  var userInfo2 = {
    email: 'angelo@gmail.com',
    password: 'shoopdawoosdfsdf'
  };
  var fakeUser;
  var fakeUser2;
  var orderInfo;
  beforeEach('Create a user', function (done) {
      User.create([userInfo, userInfo2]).then(function(users){
      fakeUser = users[0];
      fakeUser2 = users[1];
      var itemInfo = {
        title: 'Spinach',
      	description: 'Leafy green',
      	price: 10,
      	cartQuantity: 200,
      	category: 'Vegetable',
      };

      var itemInfo2 = {
        title: 'Mangosteen',
      	description: 'Weird white fruit',
      	price: 15,
      	cartQuantity: 1000,
      	category: 'Fruit',
      };

      orderInfo = {
        user: fakeUser._id,
        items: [itemInfo],
        shippingAddress: '123 Fake St'
      };

      var orderInfo2 = {
        user: fakeUser2._id,
        items: [itemInfo],
        shippingAddress: '321 Real St'
      };
      Order.create([orderInfo, orderInfo2], done);
    });
  });



  beforeEach('Create loggedIn user agent and authenticate', function (done) {
    loggedInAgent = supertest.agent(app);
    loggedInAgent.post('/login').send(userInfo).end(done);
  });

  describe('Requesting all orders for a user', function () {
    it('should return an array of only the users orders', function(done){
      loggedInAgent.get('/api/orders/user').expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(1);
        done();
      });
    });
  });

  describe('',function(){
    it('', function(done){
      loggedInAgent.post('/api/orders/123')
      .send(orderInfo)
      .end(function(err, response){
        if (err) return done(err);
        expect(response.body).to.have.property('_id');
        done();
    });
  });
});

});
