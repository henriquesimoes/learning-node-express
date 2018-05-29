const chai = require('chai');
const should = chai.should();
const config = require('config');
const database = require('../lib/database');

describe('Database Connection', () => {
  it('should connect to mongodb database', (done) => {
    database.connectToDatabase(config.get('db.name'), (err) => {
      if (err) done(err);
      database.db.should.be.a('object');
      database.db.should.have.property('collection');
      database.db.should.have.property('databaseName');
      database.db.databaseName.should.be.equal(config.get('db.name'));
      done();
    });
  });
});
