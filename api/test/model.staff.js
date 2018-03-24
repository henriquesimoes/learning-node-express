const chai = require('chai');
const should = chai.should();

var Staff = require('../model/staff');

describe('Staff Model', () => {
    describe('name variable', () => {
        it('should set name', (done) => {
            let staff = new Staff({name: 'John'});

            staff.should.have.property('name');
            staff.name.should.be.a('string');
            staff.name.should.be.eql('John');
            done();
        });
    });

    describe('salary variable', () => {
        it('should set salary', (done) => {
            let staff = new Staff({salary: 200});

            staff.should.have.property('salary');
            staff.salary.should.be.a('number');
            staff.salary.should.be.eql(200);
            done();
        });
        it('should set 0 when trying to set a negative value', (done) => {
            let staff = new Staff({salary: -200});

            staff.should.have.property('salary');
            staff.salary.should.be.a('number');
            staff.salary.should.be.eql(0);
            done();
        });
    });

    describe('phone variable', () => {
        it('should set phone', (done) => {
            let staff = new Staff({phone: '1234-0987'});

            staff.should.have.property('phone');
            staff.phone.should.be.a('string');
            staff.phone.should.be.eql('1234-0987');
            done();
        });
    });

    describe('email variable', () => {
        it('should set email', (done) => {
            let staff = new Staff({email: 'john@email.com'});

            staff.should.have.property('email');
            staff.email.should.be.a('string');
            staff.email.should.be.eql('john@email.com');
            done();
        });
    });
});;