const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('casa', 'apartamento', 'local', 'terreno'),
    allowNull: false
  },
  habitaciones: {
    type: DataTypes.INTEGER
  },
  banos: {
    type: DataTypes.INTEGER
  },
  area: {
    type: DataTypes.FLOAT
  },
  estado: {
    type: DataTypes.ENUM('disponible', 'vendido', 'reservado'),
    defaultValue: 'disponible'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Property;