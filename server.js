require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const contactsRouter = require('./routes/api/contacts');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
  process.exit(1);
});

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

const app = require('./app');

app.use(express.json());
app.use(cors());
app.use('/api/contacts', contactsRouter);
app.use(errors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
