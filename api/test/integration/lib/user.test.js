'use strict';

const app = require('../../../lib/app');
const request = require('supertest');
const Database = require('../../../lib/database');

const path = '/users';

describe(path, () => {
  beforeAll(async (done) => {
    await Database.connectToDatabase();
    done();
  });
  it('should work', async () => {
    const res = await request(app).get(path);

    expect(res.body).toEqual([]);
  });
});
