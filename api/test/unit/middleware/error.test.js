'use strict';

const error = require('../../../lib/middleware/error');
const debug = require('debug');

describe('Error Middleware', () => {
  beforeAll(() => {
    debug.disable();
  });

  it('should return 500 if internal error occurs', () => {
    const err = new Error('Error that might occur internally');
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    error(err, null, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalled();
  });
});
