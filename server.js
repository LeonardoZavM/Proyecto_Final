import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { getAll, create, update, remove } from './model.clientes.js';

dotenv.config();
const PORT = process.env.PORT || 3001;  // Número de puerto
const proyect = process.env.SQLITE_DB || 'proyect.sqlite3'; // Nombre de la base de datos

const app = express();

// Middleware para procesar parámetros URL-encoded
app.use(express.urlencoded({ extended: true }));
// Middleware para procesar parámetros JSON
app.use(express.json());
// Middleware para procesar parámetros text
app.use(express.text());

app.use(express.static(path.join(process.cwd(), 'public')));

// Ruta raíz para redirigir al menú
app.get("/menu", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'menu.html'));  // Redirige al menu.html
});


// Ruta para acceder al index.html
app.get("/index", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));  // Redirige a index.html
});

// Ruta para obtener todos los clientes
app.get('/getAll', (req, res) => {
  const resp = getAll(proyect);
  res.set({ "content-type": "application/json" });
  res.send(JSON.stringify(resp));
});

// Ruta para obtener un cliente por ID
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const cliente = get(proyect, id);
  res.set({ "content-type": "application/json" });
  res.send(JSON.stringify(cliente));
});

// Ruta para insertar un nuevo cliente
app.post('/insert', (req, res) => {
  const dato = {
    Name: req.body.Name,
  };
  const resp = create(proyect, dato);
  res.json({ message: 'Registro insertado correctamente', data: resp });
});

// Ruta para actualizar un cliente por nombre
app.put('/update/:name', (req, res) => {
  const name = req.params.name;
  const dato = {
    Name: req.body.Name  // Nuevo nombre si se actualiza
  };

  const resp = update(proyect, name, dato);  // Actualiza por nombre en lugar de ID
  res.json({ message: 'Registro actualizado correctamente', data: resp });
});

// Ruta para eliminar un cliente por ID
app.delete('/delete/:ID', (req, res) => {
  const ID = req.params.ID;
  const resp = remove(proyect, ID);
  res.json({ message: 'Registro eliminado correctamente', data: resp });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
