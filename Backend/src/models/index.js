const sequelize = require('../config/database');
const User = require('./User');
const Property = require('./Property');

// Relaciones
User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Property
};