const bcryptJs = require('bcryptjs');

const { bcrypt } = require('../config');

const user = {
  firstName: 'System',
  lastName: 'Admin',
  nickName: null,
  email: 'admin@gmail.com',
  password: 'admin',
  gender: null,
  dob: null,
  isDeleted: false,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0
};

module.exports = {
  async up(db, client) {
    try {
      user.password = await bcryptJs.hash(user.password, parseInt(bcrypt.salt));
      await db.collection('users').insertOne(user);

      console.log("User migration up run successfully.");
    } catch (error) {
      console.log(errorTag + " Something went wrong while running user migration");
    }
  },

  async down(db, client) {
    try {
      await db.collection('users').deleteOne({ email: user.email });
      console.log("User migration down run successfully.");
    } catch (error) {
      console.log("Something went wrong while running user migration");
    }
  }
};
