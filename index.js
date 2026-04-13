const express = require('express');
const app = express();


const alumnosRoutes = require('./src/routes/alumnos');
const profesoresRoutes = require('./src/routes/profesores');

app.use(express.json());

app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`);
});