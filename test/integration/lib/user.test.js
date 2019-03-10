'use strict';

const app = require('../../../lib/app');
const {User} = require('../../../lib/user');
const request = require('supertest').agent(app);
const Database = require('../../../lib/database');
const mongoose = require('mongoose');

const path = '/users/';

describe(path, () => {
  let userInDb;
  beforeAll(async (done) => {
    await Database.connectToDatabase();
    done();
  });

  beforeEach(async (done) => {
    userInDb = {
      name: 'ab',
      email: 'a@a',
      password: '123456',
      balance: '1000'
    };
    userInDb = await new User(userInDb).save();
    done();
  });

  afterEach(async (done) => {
    await User.remove({});
    done();
  });

  describe('GET /', () => {
    const exec = () => {
      return request.get(path);
    };

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return all users if request is valid', async () => {
      const res = await exec();

      expect(res.body).toBeInstanceOf(Array);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining(['_id', 'name', 'email', 'balance']));
    });
  });

  describe('GET /:id', () => {
    const exec = () => {
      return request.get(path + userInDb._id);
    };

    it('should return 404 if user with the given id was not found',
      async () => {
        userInDb._id = mongoose.Types.ObjectId();

        const res = await exec();

        expect(res.status).toBe(404);
      });

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return user if request is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', userInDb._id.toHexString());
      expect(res.body).toHaveProperty('name', userInDb.name);
      expect(res.body).toHaveProperty('email', userInDb.email);
    });
  });

  describe('POST /', () => {
    let user;

    beforeEach(async () => {
      user = {
        name: 'bc',
        email: 'b@b',
        password: '123456'
      };
    });

    const exec = () => {
      return request
        .post(path)
        .send(user);
    };

    it('should return 400 if name is not provided', async () => {
      delete user.name;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*name.*/i);
    });

    it('should return 400 if name is not a string', async () => {
      user.name = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*name)(?=.*string).+/i);
    });

    it('should return 400 if name is shorter than 2 characters',
      async () => {
        user.name = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*name)(?=.*2.*characters).+/i);
      });

    it('should return 400 if name is more than 20 characters long',
      async () => {
        user.name = new Array(22).fill('a').toString();

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*name)(?=.*20.*characters).+/i);
      });

    it('should return 400 if email is not provided', async () => {
      delete user.email;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*email.*/i);
    });

    it('should return 400 if email is not a string', async () => {
      user.email = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*email)(?=.*string).+/i);
    });

    it('should return 400 if email is invalid', async () => {
      user.email = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*email.*/i);
    });

    it('should return 400 if password is not provided', async () => {
      delete user.password;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/.*password.*/i);
    });

    it('should return 400 if password is not a string', async () => {
      user.password = [];

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*password)(?=.*string).+/i);
    });

    it('should return 400 if password is shorter than 6 characters',
      async () => {
        user.password = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.text).toMatch(/(?=.*password)(?=.*6.*characters).+/i);
      });

    it('should return 400 if user is already registered', async () => {
      user.email = userInDb.email;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/(?=.*user)(?=.*registered).+/i);
    });

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return user if request is valid', async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(Object.keys(user)));
    });

    it('should save user in the database if request is valid', async () => {
      await exec();

      const userInDb = await User.findOne({email: user.email});

      expect(userInDb).toHaveProperty('_id');
      expect(userInDb).toHaveProperty('name', user.name);
      expect(userInDb).toHaveProperty('email', user.email);
      expect(userInDb).toHaveProperty('password');
      expect(userInDb).toHaveProperty('balance', 0);
    });
  });

  describe('PUT /:id', () => {
    let updatedUser;
    let id;

    beforeEach(() => {
      updatedUser = {
        name: 'bc',
        email: 'b@b',
        password: '234567',
        balance: 2000
      };
      id = userInDb._id;
    });

    const exec = () => {
      return request
        .put(path + id)
        .send(updatedUser);
    };

    it('should return 400 if no user property is provided', async () => {
      updatedUser = {};

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if name is more than 20 characters long',
      async () => {
        updatedUser.name = Array(22).fill('a').toString();

        const res = await exec();

        expect(res.status).toBe(400);
      });

    it('should return 400 if password is shorter than 6 characters',
      async () => {
        updatedUser.password = '12345';

        const res = await exec();

        expect(res.status).toBe(400);
      });

    it('should return 404 if user not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 200 if only name is provided', async () => {
      delete updatedUser.password;
      delete updatedUser.email;
      delete updatedUser.balance;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if only email is provided', async () => {
      delete updatedUser.password;
      delete updatedUser.name;
      delete updatedUser.balance;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if only password is provided', async () => {
      delete updatedUser.name;
      delete updatedUser.email;
      delete updatedUser.balance;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if only balance is provided', async () => {
      delete updatedUser.name;
      delete updatedUser.email;
      delete updatedUser.password;

      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return 200 if all properties are provided at once', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return updated user if the request is valid', async () => {
      const res = await exec();

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['_id', 'name', 'email']));
    });

    it('should update only user name if only name is provided',
      async () => {
        delete updatedUser.email;
        delete updatedUser.password;
        delete updatedUser.balance;

        await exec();
        const updatedUserInDb = await User.findById(userInDb._id);

        expect(updatedUserInDb).toHaveProperty('name', updatedUser.name);
        expect(updatedUserInDb).toHaveProperty('email', userInDb.email);
        expect(updatedUserInDb).toHaveProperty('password', userInDb.password);
        expect(updatedUserInDb).toHaveProperty('balance', userInDb.balance);
      });

    it('should update only user email if only email is provided',
      async () => {
        delete updatedUser.name;
        delete updatedUser.password;
        delete updatedUser.balance;

        await exec();
        const updatedUserInDb = await User.findById(userInDb._id);

        expect(updatedUserInDb).toHaveProperty('name', userInDb.name);
        expect(updatedUserInDb).toHaveProperty('email', updatedUser.email);
        expect(updatedUserInDb).toHaveProperty('password', userInDb.password);
        expect(updatedUserInDb).toHaveProperty('balance', userInDb.balance);
      });

    it('should update only user password if only password is provided',
      async () => {
        delete updatedUser.name;
        delete updatedUser.email;
        delete updatedUser.balance;

        await exec();
        const updatedUserInDb = await User.findById(userInDb._id);

        expect(updatedUserInDb).toHaveProperty('name', userInDb.name);
        expect(updatedUserInDb).toHaveProperty('email', userInDb.email);
        expect(updatedUserInDb).toHaveProperty('balance', userInDb.balance);
        expect(updatedUserInDb.password).not.toBe(userInDb.password);
      });

    it('should update only user balance if only balance is provided',
      async () => {
        delete updatedUser.name;
        delete updatedUser.email;
        delete updatedUser.password;

        await exec();
        const updatedUserInDb = await User.findById(userInDb._id);

        expect(updatedUserInDb).toHaveProperty('name', userInDb.name);
        expect(updatedUserInDb).toHaveProperty('email', userInDb.email);
        expect(updatedUserInDb).toHaveProperty('password', userInDb.password);
        expect(updatedUserInDb).toHaveProperty('balance', updatedUser.balance);
      });

    it('should update all user properties if all of them are provided',
      async () => {
        await exec();

        const updatedUserInDb = await User.findById(userInDb._id);

        expect(updatedUserInDb).toHaveProperty('name', updatedUser.name);
        expect(updatedUserInDb).toHaveProperty('email', updatedUser.email);
        expect(updatedUserInDb.password).not.toBe(userInDb.password);
      });
  });

  describe('DELETE /:id', () => {
    let id;

    const exec = () => {
      return request
        .delete(path + id);
    };

    beforeEach(() => {
      id = userInDb._id;
    });

    it('should return 404 if user not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return deleted user if request is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', userInDb._id.toHexString());
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
    });

    it('should delete user if request is valid', async () => {
      await exec();

      const user = await User.findById(id);

      expect(user).toBeNull();
    });
  });
});
