const chai = require("chai");
const should = chai.should();
const config = require("config");
const database = require("../lib/database");
const server = require("../server");
const chaiHttp = require("chai-http");

var staffTest = {
    _id: null,
    name: 'John',
    salary: 1000,
    phone: '3453-3245',
    email: 'john@plantio.com'
}

chai.use(chaiHttp);
describe('Database Connection', () => {
    it('should connect to mongodb database', (done) => {
        database.connectToDatabase(config.get('db.name'), (err) => {
            if(err) done(err);
            database.db.should.be.a('object');
            database.db.should.have.property('collection');
            database.db.should.have.property('databaseName');
            database.db.databaseName.should.be.equal(config.get('db.name'));
            done();
        });

    });
});
describe('Staffs', () => {
    before((done) => {
        database.db.collection('staff').deleteMany({}, (err, obj) => {
            if(err) throw done(err);
            done();
        });
    });
    describe('GET staff/', () => {
        it('should list NO staff', (done) => {
            chai.request(server)
                .get('/staff')
                .end((err, res) => {
                    if(err) done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('POST staff/', () => {
        it('should insert a staff into database', (done) => {
            chai.request(server)
                .post('/staff')
                .send(staffTest)
                .end((err, res) => {
                    if(err) done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should list a SINGLE staff after insertion', (done) => {
            chai.request(server)
                .get('/staff')
                .end((err, res) => {
                    if(err) done(err);
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(1);
                    res.body[0].should.have.property('_id');
                    staffTest._id = res.body[0]._id;
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.be.equal(staffTest.name);
                    res.body[0].should.have.property('salary');
                    res.body[0].salary.should.be.a('number');
                    res.body[0].salary.should.be.equal(staffTest.salary);
                    res.body[0].should.have.property('phone');
                    res.body[0].phone.should.be.equal(staffTest.phone);
                    res.body[0].should.have.property('email');
                    res.body[0].email.should.be.a('string');
                    res.body[0].email.should.be.equal(staffTest.email);
                    done();
                });
        });
    });

    describe('PUT staff/:id', () => {
        it('should list a SINGLE staff to be edited', (done) => {
            chai.request(server)
                .get('/staff/' + staffTest._id)
                .end((err, res) => {
                    if(err) throw done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body._id.should.be.equal(staffTest._id);
                    res.body.should.have.property('name');
                    res.body.name.should.be.equal(staffTest.name);
                    res.body.should.have.property('salary');
                    res.body.salary.should.be.a('number');
                    res.body.salary.should.be.equal(staffTest.salary);
                    res.body.should.have.property('phone');
                    res.body.phone.should.be.equal(staffTest.phone);
                    res.body.should.have.property('email');
                    res.body.email.should.be.a('string');
                    res.body.email.should.be.equal(staffTest.email);
                    done();
                });
        });
        it('should receive edited staff', (done) => {
            chai.request(server)
                .put('/staff/' + staffTest._id)
                .send({
                    id: staffTest._id,
                    name: staffTest.name,
                    salary: staffTest.salary + 200,
                    email: staffTest.email,
                    phone: staffTest.phone
                })
                .end((err, res) => {
                    if(err) done(err);
                    res.should.be.a('object');
                    done();
                });
        });
        it('should return edited staff', (done) => {
            chai.request(server)
                .get('/staff/' + staffTest._id)
                .end((err, res) => {
                    if(err) throw done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body._id.should.be.equal(staffTest._id);
                    res.body.should.have.property('name');
                    res.body.name.should.be.equal(staffTest.name);
                    res.body.should.have.property('salary');
                    res.body.salary.should.be.a('number');
                    res.body.salary.should.be.equal(staffTest.salary + 200);
                    res.body.should.have.property('phone');
                    res.body.phone.should.be.equal(staffTest.phone);
                    res.body.should.have.property('email');
                    res.body.email.should.be.a('string');
                    res.body.email.should.be.equal(staffTest.email);
                    done(); 
                });
        });
    });
    describe('DELETE staff/:id', () => {
        it('should receive delete request', (done) => {
            chai.request(server)
                .delete('/staff/' + staffTest._id)
                .end((err, res) => {
                    res.should.be.a('object');
                    done();
                });
        });
        it('should have deleted the staff', (done) => {
            chai.request(server)
                .get('/staff/' + staffTest._id)
                .end((err, res) => {
                    if(err) done(err);
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.be.equal('not found');
                    done();
                });
        });
    });
});