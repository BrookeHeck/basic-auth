'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users');
const Collection = require('./Collection');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';
// in production we want to add this object:
let herokuOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
let sequelize = new Sequelize(DATABASE_URL, herokuOptions);

const UserModel = userSchema(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users: new Collection(UserModel),
};