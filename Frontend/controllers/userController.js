const { User } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// NUEVA FUNCIÓN: Crear usuario (solo admin)
const createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol, telefono } = req.body;
    
    // Validar campos requeridos
    if (!nombre || !email || !password) {
      return res.status(400).json({ 
        message: 'Los campos nombre, email y password son obligatorios' 
      });
    }

    // Verificar si el email ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Crear usuario (la contraseña se hashea automáticamente por el hook)
    const user = await User.create({
      nombre,
      email,
      password,
      rol: rol || 'cliente',
      telefono,
      isActive: true
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        telefono: user.telefono,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    await user.update(req.body);
    
    // Ocultar password en la respuesta
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.json({ message: 'Usuario actualizado', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

// Exportar la nueva función
module.exports = { getUsers, getUserById, updateUser, deleteUser, createUser };
