
const { Property, User } = require('../models');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: User,
        attributes: ['id', 'nombre', 'email']
      }]
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades', error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'nombre', 'email']
      }]
    });
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedad', error: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const propertyData = { ...req.body, userId: req.user.id };
    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear propiedad', error: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    
    if (property.userId !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para editar esta propiedad' });
    }
    
    await property.update(req.body);
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar propiedad', error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    
    if (property.userId !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta propiedad' });
    }
    
    await property.destroy();
    res.json({ message: 'Propiedad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar propiedad', error: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
