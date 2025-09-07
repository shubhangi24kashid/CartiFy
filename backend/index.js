const express = require('express');
const cors = require('cors');
const productRouter = require('./Routes/Product');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', productRouter);

// Dynamic port (for deployment)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
