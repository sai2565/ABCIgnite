const express = require('express');
const bodyParser = require('body-parser');
const classRoutes = require('./routes/classRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Create the Express app
const app = express();

// Use the body-parser middleware
app.use(bodyParser.json());

// Use the class routes
app.use('/api/classes', classRoutes);

// Use the booking routes
app.use('/api/bookings', bookingRoutes);

// Use the error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));