const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

// Routes
app.use('/api/hikes', require('./routes/hikeRoutes'))

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
})