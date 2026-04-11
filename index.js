const express = require('express');
const app = express();
app.use(express.json());

let alumnos = [];
let profesores = [];

// ================= VALIDACIONES =================
const validarAlumno = (req, res, next) => {
    try {
        const { id, nombres, apellidos, matricula, promedio } = req.body;
        // Evitamos usar !nombres para no bloquear el numero 0, mejor revisamos undefined
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
        // Flexibilizamos numeroEmpleado: lo aceptamos como String O como Number
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

// ================= ENDPOINTS ALUMNOS =================
app.get('/alumnos', (req, res) => res.status(200).json(alumnos));

app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
    if (alumno) res.status(200).json(alumno);
    else res.status(404).json({ error: "No encontrado" });
});

app.post('/alumnos', validarAlumno, (req, res) => {
    alumnos.push(req.body);
    res.status(201).json({ mensaje: "Creado", alumno: req.body });
});

app.put('/alumnos/:id', validarAlumno, (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        alumnos[index] = req.body;
        res.status(200).json({ mensaje: "Actualizado", alumno: req.body });
    } else {
        res.status(404).json({ error: "No encontrado" });
    }
});

app.delete('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        alumnos.splice(index, 1);
        res.status(200).json({ mensaje: "Eliminado" });
    } else {
        res.status(404).json({ error: "No encontrado" });
    }
});

// ================= ENDPOINTS PROFESORES =================
app.get('/profesores', (req, res) => res.status(200).json(profesores));

app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id === parseInt(req.params.id));
    if (profesor) res.status(200).json(profesor);
    else res.status(404).json({ error: "No encontrado" });
});

app.post('/profesores', validarProfesor, (req, res) => {
    profesores.push(req.body);
    res.status(201).json({ mensaje: "Creado", profesor: req.body });
});

app.put('/profesores/:id', validarProfesor, (req, res) => {
    const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        profesores[index] = req.body;
        res.status(200).json({ mensaje: "Actualizado", profesor: req.body });
    } else {
        res.status(404).json({ error: "No encontrado" });
    }
});

app.delete('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        profesores.splice(index, 1);
        res.status(200).json({ mensaje: "Eliminado" });
    } else {
        res.status(404).json({ error: "No encontrado" });
    }
});

// ================= MANEJO DEL ERROR 405 =================
// Si la ruta existe pero el método (PATCH, OPTIONS, etc) no está arriba, cae aquí
app.all('/alumnos', (req, res) => res.status(405).json({ error: "Método no permitido" }));
app.all('/alumnos/:id', (req, res) => res.status(405).json({ error: "Método no permitido" }));
app.all('/profesores', (req, res) => res.status(405).json({ error: "Método no permitido" }));
app.all('/profesores/:id', (req, res) => res.status(405).json({ error: "Método no permitido" }));

// Levantar servidor (Usa el puerto que te funcionó en el paso anterior, 3000 u 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});