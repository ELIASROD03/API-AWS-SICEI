const express = require('express');
const router = express.Router();

// Importamos el controlador y el middleware de validación
const { validarProfesor } = require('../middlewares/validaciones');
const profesoresController = require('../controllers/profesores');

// Definición de rutas
// Nota: Como en index.js usaremos app.use('/profesores', ...),
// aquí solo ponemos '/' para referirnos a la ruta base de profesores.

router.get('/', profesoresController.getProfesores);
router.get('/:id', profesoresController.getProfesorById);
router.post('/', validarProfesor, profesoresController.createProfesor);
router.put('/:id', validarProfesor, profesoresController.updateProfesor);
router.delete('/:id', profesoresController.deleteProfesor);

// Trampa para el error 405 (Método no permitido)
router.all('/', (req, res) => {
    res.status(405).json({ error: "Método no permitido en la lista de profesores" });
});

router.all('/:id', (req, res) => {
    res.status(405).json({ error: "Método no permitido para este profesor" });
});

module.exports = router;