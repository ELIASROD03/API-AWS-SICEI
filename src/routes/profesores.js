const express = require('express');
const router = express.Router();

const { validarProfesor } = require('../middlewares/validaciones');
const profesoresController = require('../controllers/profesores');



router.get('/', profesoresController.getProfesores);
router.get('/:id', profesoresController.getProfesorById);
router.post('/', validarProfesor, profesoresController.createProfesor);
router.put('/:id', validarProfesor, profesoresController.updateProfesor);
router.delete('/:id', profesoresController.deleteProfesor);


router.all('/', (req, res) => {
    res.status(405).json({ error: "Método no permitido en la lista de profesores" });
});

router.all('/:id', (req, res) => {
    res.status(405).json({ error: "Método no permitido para este profesor" });
});

module.exports = router;