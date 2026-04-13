const express = require('express');
const router = express.Router();
const { validarAlumno } = require('../middlewares/validaciones');
const alumnosController = require('../controllers/alumnos');

router.get('/', alumnosController.getAlumnos);
router.get('/:id', alumnosController.getAlumnoById);
router.post('/', validarAlumno, alumnosController.createAlumno);
router.put('/:id', validarAlumno, alumnosController.updateAlumno);
router.delete('/:id', alumnosController.deleteAlumno);

// Manejo del error 405 (Solo para la ruta base de alumnos)
router.all('/', (req, res) => res.status(405).json({ error: "Método no permitido" }));
router.all('/:id', (req, res) => res.status(405).json({ error: "Método no permitido" }));

module.exports = router;