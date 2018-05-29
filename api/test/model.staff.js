const chai = require('chai');
const should = chai.should();

let Staff = require('../model/staff');

describe('Staff Model', () => {
  let staffTest = {
    id: 1111111111111111,
    name: 'John',
    salary: 200,
    phone: '1234-1234',
    email: 'john@email.com'
  };
  describe('constructor receiving staff properties', () => {
    it('should set name', (done) => {
      let staff = new Staff({name: staffTest.name});

      staff.should.have.property('name');
      staff.name.should.be.a('string');
      staff.name.should.be.eql(staffTest.name);
      done();
    });
    it('should set salary', (done) => {
      let staff = new Staff({salary: staffTest.salary});

      staff.should.have.property('salary');
      staff.salary.should.be.a('number');
      staff.salary.should.be.eql(staffTest.salary);
      done();
    });
    it('should set 0 when trying to set a negative value to salary', (done) => {
      let staff = new Staff({salary: staffTest.salary * -1});

      staff.should.have.property('salary');
      staff.salary.should.be.a('number');
      staff.salary.should.be.eql(0);
      done();
    });
    it('should set phone', (done) => {
      let staff = new Staff({phone: staffTest.phone});

      staff.should.have.property('phone');
      staff.phone.should.be.a('string');
      staff.phone.should.be.eql(staffTest.phone);
      done();
    });
    it('should set email', (done) => {
      let staff = new Staff({email: staffTest.email});

      staff.should.have.property('email');
      staff.email.should.be.a('string');
      staff.email.should.be.eql(staffTest.email);
      done();
    });
    it('should set all properties at once', (done) => {
      let staff = new Staff(staffTest);

      staff.should.have.property('id', staffTest.id);
      staff.should.have.property('name', staffTest.name);
      staff.should.have.property('phone', staffTest.phone);
      staff.should.have.property('email', staffTest.email);
      staff.should.have.property('salary', staffTest.salary);
      done();
    });
  });

  describe('.insertFormat', () => {
    it('should return an object without id', (done) => {
      let staff = new Staff(staffTest);

      staff.should.have.property('insertFormat');
      staff.insertFormat.should.have.property('name', staffTest.name);
      staff.insertFormat.should.have.property('phone', staffTest.phone);
      staff.insertFormat.should.have.property('email', staffTest.email);
      staff.insertFormat.should.have.property('salary', staffTest.salary);
      staff.insertFormat.should.not.have.property('_id');
      done();
    });
  });

  describe('.updateFormat', () => {
    it('should return an object with all properties but id', (done) => {
      let staff = new Staff(staffTest);

      staff.should.have.property('updateFormat');
      staff.updateFormat.should.have.property('name', staffTest.name);
      staff.updateFormat.should.have.property('phone', staffTest.phone);
      staff.updateFormat.should.have.property('email', staffTest.email);
      staff.updateFormat.should.have.property('salary', staffTest.salary);
      staff.updateFormat.should.not.have.property('_id');
      done();
    });
    it('should return an object with all properties but id, name', (done) => {
      let staffWithoutName = staffTest;
      delete staffWithoutName.name;
      let staff = new Staff(staffWithoutName);

      staff.should.have.property('updateFormat');
      staff.updateFormat.should.have.property('phone', staffTest.phone);
      staff.updateFormat.should.have.property('email', staffTest.email);
      staff.updateFormat.should.have.property('salary', staffTest.salary);
      staff.updateFormat.should.not.have.property('_id');
      staff.updateFormat.should.not.have.property('name');
      done();
    });
  });
});
