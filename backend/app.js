require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const con = require('./dbConnector');
const jwt = require('jsonwebtoken');
const path = require('path');

function authenticateToken(req, res, next) {
  let token = req.body.token;
  if (!token) {
    return res.status(401).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));
app.use(
  require('./routes/karyawanController')(con, express, authenticateToken),
  require('./routes/loginController')(con, express, authenticateToken),
  require('./routes/absensiController')(con, express, authenticateToken)
);


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
