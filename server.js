const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const mongoURI =
  'mongodb+srv://camilorivera84:7219297Hd@e-commerce.dw4capt.mongodb.net/?retryWrites=true&w=majority';
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

app.use(express.json());
app.use(cors());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
