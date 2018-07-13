'use strict';

const {User} = require('../../../lib/user');
const bcrypt = require('bcrypt');

describe('User', () => {
  describe('.encryptPassword', () => {
    let password;
    let user;

    beforeEach(() => {
      password = '123456';
      user = new User({password});
    });

    it('should return a valid encrypted password', async () => {
      const encryptedPassword = await user.encryptPassword();

      const result = await bcrypt.compare(password, encryptedPassword);

      expect(result).toBeTruthy();
    });

    it('should update user.password property', async () => {
      const password = user.password;

      await user.encryptPassword();

      expect(user.password).not.toBe(password);
    });

    it('should set user.password property to encrypted password', async () => {
      const password = user.password;

      await user.encryptPassword();
      const result = await bcrypt.compare(password, user.password);

      expect(result).toBeTruthy();
    });
  });

  describe('.encrypt', () => {
    let value;

    beforeEach(() => {
      value = 'a';
    });

    it('should return encrypted value if a string is supplied',
      async () => {
        const encrypted = await User.encrypt(value);

        const result = await bcrypt.compare(value, encrypted);

        expect(result).toBeTruthy();
      });
  });
});
