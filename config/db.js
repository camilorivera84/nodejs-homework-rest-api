const mongoose = require('mongoose');

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
  console.log('Database connection successful');
});

module.exports = db;
