const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/usuariosDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error(err));

// Esquema y modelo
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    edad: Number
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// CRUD
// Crear
app.post('/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.send(usuario);
});

// Leer
app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.send(usuarios);
});

// Actualizar
app.put('/usuarios/:id', async (req, res) => {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(usuario);
});

// Eliminar
app.delete('/usuarios/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.send({ message: 'Usuario eliminado' });
});

// Servidor
app.listen(3000, () => console.log("Servidor en puerto 3000"));
