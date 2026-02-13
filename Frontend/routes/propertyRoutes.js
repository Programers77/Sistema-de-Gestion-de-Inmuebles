
const express = require('express');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Obtener todas las propiedades
 *     tags: [Propiedades]
 *     responses:
 *       200:
 *         description: Lista de propiedades
 */
router.get('/', getProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Obtener una propiedad por ID
 *     tags: [Propiedades]
 */
router.get('/:id', getPropertyById);

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Crear una nueva propiedad
 *     tags: [Propiedades]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, createProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Actualizar una propiedad
 *     tags: [Propiedades]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authMiddleware, updateProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Eliminar una propiedad
 *     tags: [Propiedades]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;
