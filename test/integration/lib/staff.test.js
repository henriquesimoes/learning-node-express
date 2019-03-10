'use strict';

const app = require('../../../lib/app');
const {Staff} = require('../../../lib/staff');
const request = require('supertest').agent(app);
const Database = require('../../../lib/database');
const mongoose = require('mongoose');

const path = '/staffs/';

describe(path, () => {
  let staff;
  beforeAll(async (done) => {
    await Database.connectToDatabase();
    done();
  });

  beforeEach(async (done) => {
    staff = {
      name: 'ab',
      email: 'a@a',
      phone: '1234-5678',
      salary: 1
    };
    staff = await new Staff(staff).save();
    await new Staff({
      name: 'bc',
      email: 'b@b',
      phone: '1234-5678',
      salary: 1
    });
    done();
  });

  afterEach(async (done) => {
    await Staff.remove({});
    done();
  });

  describe('GET /', () => {
    let query;

    beforeEach(() => {
      query = '';
    });

    const exec = () => {
      return request.get(path).query({q: query});
    };

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return array of staffs if request is valid', async () => {
      const res = await exec();

      expect(res.body).toBeInstanceOf(Array);
      expect(Object.keys(res.body.pop())).toEqual(
        expect.arrayContaining(['name', 'email', 'phone', 'salary']));
    });

    it('should return only staffs whose name matches the query', async () => {
      query = 'a';

      const res = await exec();

      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /:id', () => {
    const exec = () => {
      return request.get(path + staff._id);
    };

    it('should return 404 if staff with the given id was not found',
      async () => {
        staff._id = mongoose.Types.ObjectId();

        const res = await exec();

        expect(res.status).toBe(404);
      });

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return staff if request is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', staff._id.toHexString());
      expect(res.body).toHaveProperty('name', staff.name);
      expect(res.body).toHaveProperty('email', staff.email);
    });
  });

  describe('POST /', () => {
    let newStaff;

    beforeEach(() => {
      newStaff = {
        name: 'cd',
        email: 'c@c',
        phone: '1234-5678',
        salary: 1
      };
    });

    const exec = () => {
      return request.post(path).send(newStaff);
    };

    it('should return 400 if name is not provided', async () => {
      delete newStaff.name;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*name.*/i);
    });

    it('should return 400 if name is not a string', async () => {
      newStaff.name = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*name)(?=.*string).+/i);
    });

    it('should return 400 if name is shorter than 2 characters',
      async () => {
        newStaff.name = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*name)(?=.*2.*characters).+/i);
      });

    it('should return 400 if name is more than 20 characters long',
      async () => {
        newStaff.name = new Array(22).fill('a').toString();

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*name)(?=.*20.*characters).+/i);
      });

    it('should return 400 if email is not provided', async () => {
      delete newStaff.email;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*email.*/i);
    });

    it('should return 400 if email is not a string', async () => {
      newStaff.email = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*email)(?=.*string).+/i);
    });

    it('should return 400 if email is invalid', async () => {
      newStaff.email = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*email.*/i);
    });

    it('should return 200 if phone is not provided', async () => {
      delete newStaff.phone;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 400 if phone is not a string', async () => {
      newStaff.phone = 1;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*phone)(?=.*string).+/i);
    });

    it('should return 400 if phone is invalid', async () => {
      newStaff.phone = '...';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*phone.*/);
    });

    it('should return 400 if salary is not provided', async () => {
      delete newStaff.salary;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*salary.*/);
    });

    it('should return 400 if salary is not a number', async () => {
      newStaff.salary = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*salary)(?=.*number).+/i);
    });

    it('should return 400 if salary is negative', async () => {
      newStaff.salary = -1;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*salary)(?=.*0).+/i);
    });

    it('should return 400 if staff is already registered', async () => {
      newStaff.email = staff.email;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*staff)(?=.*registered).+/i);
    });

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return staff if request is valid', async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(Object.keys(newStaff)));
    });

    it('should save staff in the database if request is valid', async () => {
      await exec();

      const staffInDb = await Staff.findOne({email: newStaff.email});

      expect(staffInDb).toHaveProperty('_id');
      expect(staffInDb).toHaveProperty('name', newStaff.name);
      expect(staffInDb).toHaveProperty('email', newStaff.email);
      expect(staffInDb).toHaveProperty('phone');
      expect(staffInDb).toHaveProperty('salary');
    });
  });

  describe('PUT /:id', () => {
    let id;
    let updatedStaff;

    beforeEach(() => {
      id = staff._id;
      updatedStaff = {
        name: 'aa',
        email: 'a@b',
        phone: '8765-4321',
        salary: 2
      };
    });

    const exec = () => {
      return request.put(path + id).send(updatedStaff);
    };

    it('should return 400 if no staff property is provided', async () => {
      updatedStaff = {};

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if name is not a string', async () => {
      updatedStaff.name = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*name)(?=.*string).+/i);
    });

    it('should return 400 if name is shorter than 2 characters',
      async () => {
        updatedStaff.name = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*name)(?=.*2.*characters).+/i);
      });

    it('should return 400 if name is more than 20 characters long',
      async () => {
        updatedStaff.name = new Array(22).fill('a').toString();

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*name)(?=.*20.*characters).+/i);
      });

    it('should return 400 if email is not a string', async () => {
      updatedStaff.email = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*email)(?=.*string).+/i);
    });

    it('should return 400 if email is invalid', async () => {
      updatedStaff.email = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*email.*/i);
    });

    it('should return 400 if phone is not a string', async () => {
      updatedStaff.phone = 1;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*phone)(?=.*string).+/i);
    });

    it('should return 400 if phone is invalid', async () => {
      updatedStaff.phone = '...';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*phone.*/);
    });

    it('should return 400 if salary is not a number', async () => {
      updatedStaff.salary = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*salary)(?=.*number).+/i);
    });

    it('should return 400 if salary is negative', async () => {
      updatedStaff.salary = -1;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*salary)(?=.*0).+/i);
    });

    it('should return 404 if staff not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 200 if only name is provided', async () => {
      delete updatedStaff.phone;
      delete updatedStaff.email;
      delete updatedStaff.salary;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if only email is provided', async () => {
      delete updatedStaff.phone;
      delete updatedStaff.name;
      delete updatedStaff.salary;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if only salary is provided', async () => {
      delete updatedStaff.name;
      delete updatedStaff.email;
      delete updatedStaff.phone;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if only phone is provided', async () => {
      delete updatedStaff.name;
      delete updatedStaff.email;
      delete updatedStaff.salary;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if all properties are provided at once', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return updated staff if the request is valid', async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['_id', 'name', 'email']));
    });

    it('should update only staff name if only name is provided',
      async () => {
        delete updatedStaff.email;
        delete updatedStaff.phone;
        delete updatedStaff.salary;

        await exec();
        const staffInDb = await Staff.findById(staff._id);

        expect(staffInDb).toHaveProperty('email', staff.email);
        expect(staffInDb).toHaveProperty('salary', staff.salary);
        expect(staffInDb).toHaveProperty('phone', staff.phone);
        expect(staffInDb).toHaveProperty('name', updatedStaff.name);
      });

    it('should update only staff email if only email is provided',
      async () => {
        delete updatedStaff.name;
        delete updatedStaff.phone;
        delete updatedStaff.salary;

        await exec();
        const staffInDb = await Staff.findById(staff._id);

        expect(staffInDb).toHaveProperty('name', staff.name);
        expect(staffInDb).toHaveProperty('salary', staff.salary);
        expect(staffInDb).toHaveProperty('phone', staff.phone);
        expect(staffInDb).toHaveProperty('email', updatedStaff.email);
      });

    it('should update only staff salary if only salary is provided',
      async () => {
        delete updatedStaff.name;
        delete updatedStaff.email;
        delete updatedStaff.phone;

        await exec();
        const staffInDb = await Staff.findById(staff._id);

        expect(staffInDb).toHaveProperty('name', staff.name);
        expect(staffInDb).toHaveProperty('email', staff.email);
        expect(staffInDb).toHaveProperty('phone', staff.phone);
        expect(staffInDb).toHaveProperty('salary', updatedStaff.salary);
      });

    it('should update only staff phone if only phone is provided',
      async () => {
        delete updatedStaff.name;
        delete updatedStaff.email;
        delete updatedStaff.salary;

        await exec();
        const staffInDb = await Staff.findById(staff._id);

        expect(staffInDb).toHaveProperty('name', staff.name);
        expect(staffInDb).toHaveProperty('email', staff.email);
        expect(staffInDb).toHaveProperty('salary', staff.salary);
        expect(staffInDb).toHaveProperty('phone', updatedStaff.phone);
      });

    it('should update all staff properties if all of them are provided',
      async () => {
        await exec();

        const staffInDb = await Staff.findById(staff._id);

        expect(staffInDb).toHaveProperty('name', updatedStaff.name);
        expect(staffInDb).toHaveProperty('email', updatedStaff.email);
        expect(staffInDb).toHaveProperty('salary', updatedStaff.salary);
        expect(staffInDb).toHaveProperty('phone', updatedStaff.phone);
      });
  });

  describe('DELETE /:id', () => {
    let id;

    const exec = () => {
      return request.delete(path + id);
    };

    beforeEach(() => {
      id = staff._id;
    });

    it('should return 404 if staff not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return deleted staff if request is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', staff._id.toHexString());
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
    });

    it('should delete staff if request is valid', async () => {
      await exec();

      const staff = await Staff.findById(id);

      expect(staff).toBeNull();
    });
  });
});
