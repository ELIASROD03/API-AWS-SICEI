let profesores = []; 

const getProfesores = (req, res) => {
    res.status(200).json(profesores);
};

const getProfesorById = (req, res) => {
    const idBusqueda = parseInt(req.params.id);
    const profesor = profesores.find(p => p.id === idBusqueda);
    
    if (profesor) {
        res.status(200).json(profesor);
    } else {
        res.status(404).json({ error: "Profesor no encontrado" });
    }
};

const createProfesor = (req, res) => {
    profesores.push(req.body);
    res.status(201).json({ 
        mensaje: "Profesor creado con éxito", 
        profesor: req.body 
    });
};

const updateProfesor = (req, res) => {
    const idBusqueda = parseInt(req.params.id);
    const index = profesores.findIndex(p => p.id === idBusqueda);
    
    if (index !== -1) {
        profesores[index] = req.body;
        res.status(200).json({ 
            mensaje: "Profesor actualizado", 
            profesor: req.body 
        });
    } else {
        res.status(404).json({ error: "Profesor no encontrado" });
    }
};

const deleteProfesor = (req, res) => {
    const idBusqueda = parseInt(req.params.id);
    const index = profesores.findIndex(p => p.id === idBusqueda);
    
    if (index !== -1) {
        profesores.splice(index, 1);
        res.status(200).json({ mensaje: "Profesor eliminado exitosamente" });
    } else {
        res.status(404).json({ error: "Profesor no encontrado" });
    }
};

module.exports = { 
    getProfesores, 
    getProfesorById, 
    createProfesor, 
    updateProfesor, 
    deleteProfesor 
};