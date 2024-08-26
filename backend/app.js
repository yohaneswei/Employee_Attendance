require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const con = require('./db/dbConnector');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));
app.use(
  require('./routes/karyawanController')(con, express),
  require('./routes/loginController')(con, express),
  require('./routes/absensiController')(con, express)
);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
