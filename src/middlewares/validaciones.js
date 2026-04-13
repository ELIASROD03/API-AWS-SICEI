const validarAlumno = (req, res, next) => {
    try {
        const { id, nombres, apellidos, matricula, promedio } = req.body;
        if (id === undefined || nombres === undefined || apellidos === undefined || matricula === undefined || promedio === undefined) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        if (typeof id !== 'number' || typeof nombres !== 'string' || typeof apellidos !== 'string' || typeof matricula !== 'string' || typeof promedio !== 'number') {
            return res.status(400).json({ error: "Tipos de dato incorrectos" });
        }
        if (nombres === "" || apellidos === "" || matricula === "") {
            return res.status(400).json({ error: "Campos no pueden estar vacíos" });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};

const validarProfesor = (req, res, next) => {
    try {
        const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
        if (id === undefined || numeroEmpleado === undefined || nombres === undefined || apellidos === undefined || horasClase === undefined) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        if (typeof id !== 'number' || (typeof numeroEmpleado !== 'string' && typeof numeroEmpleado !== 'number') || typeof nombres !== 'string' || typeof apellidos !== 'string' || typeof horasClase !== 'number') {
            return res.status(400).json({ error: "Tipos de dato incorrectos" });
        }
        if (nombres === "" || apellidos === "" || numeroEmpleado === "") {
            return res.status(400).json({ error: "Campos no pueden estar vacíos" });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};

module.exports = { validarAlumno, validarProfesor };