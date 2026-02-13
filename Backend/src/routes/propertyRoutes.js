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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       500:
 *         description: Error del servidor
 */
router.get('/', getProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Obtener una propiedad por ID
 *     tags: [Propiedades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la propiedad
 *     responses:
 *       200:
 *         description: Propiedad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Propiedad no encontrada
 *       500:
 *         description: Error del servidor
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - precio
 *               - direccion
 *               - ciudad
 *               - tipo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Apartamento en el centro"
 *               descripcion:
 *                 type: string
 *                 example: "Excelente ubicación"
 *               precio:
 *                 type: number
 *                 example: 150000.50
 *               direccion:
 *                 type: string
 *                 example: "Av. Libertador #45"
 *               ciudad:
 *                 type: string
 *                 example: "Caracas"
 *               tipo:
 *                 type: string
 *                 enum: [casa, apartamento, local, terreno]
 *                 example: "apartamento"
 *               habitaciones:
 *                 type: integer
 *                 example: 2
 *               banos:
 *                 type: integer
 *                 example: 1
 *               area:
 *                 type: number
 *                 example: 85.5
 *     responses:
 *       201:
 *         description: Propiedad creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               precio:
 *                 type: number
 *               estado:
 *                 type: string
 *                 enum: [disponible, vendido, reservado]
 *     responses:
 *       200:
 *         description: Propiedad actualizada
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tienes permiso
 *       404:
 *         description: Propiedad no encontrada
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propiedad eliminada
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tienes permiso
 *       404:
 *         description: Propiedad no encontrada
 */
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;