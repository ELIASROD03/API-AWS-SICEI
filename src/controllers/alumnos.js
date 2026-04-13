let alumnos = []; 

const getAlumnos = (req, res) => res.status(200).json(alumnos);

const getAlumnoById = (req, res) => {
    const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
    if (alumno) res.status(200).json(alumno);
    else res.status(404).json({ error: "No encontrado" });
};

const createAlumno = (req, res) => {
    alumnos.push(req.body);
    res.status(201).json({ mensaje: "Creado", alumno: req.body });
};

const updateAlumno = (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        alumnos[index] = req.body;
        res.status(200).json({ mensaje: "Actualizado", alumno: req.body });
    } else {
        res.status(404).json({ error: "No encontrado" });
    }
};

const deleteAlumno = (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        alumnos.splice(index, 1);
        res.status(200).json({ mensaje: "Eliminado" });
    } else {
        res.status(404).json({ error: "No encontrado" });
    }
};

module.exports = { getAlumnos, getAlumnoById, createAlumno, updateAlumno, deleteAlumno };