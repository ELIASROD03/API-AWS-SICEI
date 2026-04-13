const express = require('express');
const app = express();

// Importar Rutas
const alumnosRoutes = require('./src/routes/alumnos');
const profesoresRoutes = require('./src/routes/profesores');

app.use(express.json());

// Conectar las rutas (El primer parámetro es el prefijo de la URL)
app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`);
});