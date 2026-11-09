const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// Configuración de la conexión a la base de datos utilizando Variables de Entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'tienda_db'
});

// Conectar a la base de datos MySQL
db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    return;
  }
  console.log('¡Conectado exitosamente a la base de datos MySQL!');
  
  // Creación automática de la tabla de productos si no existe
  db.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      precio DECIMAL(10,2) NOT NULL
    )
  `, (createErr) => {
    if (!createErr) {
      console.log('Tabla "productos" verificada o creada correctamente.');
    }
  });
});

// Ruta de bienvenida 
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Servidor de la API funcionando correctamente!' });
});

// 1. ENDPOINT GET /productos 
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, resultados) => {
    if (err) {
      return res.status(500).json({ error: 'Error al consultar los productos', detalle: err.message });
    }
    res.json(resultados);
  });
});

// 2. ENDPOINT POST /productos 
app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;

  // Validación básica de campos obligatorios
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'El nombre y el precio son obligatorios.' });
  }

  const query = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)';
  db.query(query, [nombre, precio], (err, resultado) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar el producto', detalle: err.message });
    }
    
    res.status(201).json({
      mensaje: 'Producto registrado exitosamente',
      id: resultado.insertId,
      nombre,
      precio
    });
  });
});

// Iniciar el servidor en el puerto configurado (por defecto 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})