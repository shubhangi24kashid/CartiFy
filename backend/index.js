const express = require('express');
const cors = require('cors');
const productRouter = require('./Routes/Product');

const app = express();
app.use(cors());

// now endpoints will be:
// http://localhost:5000/api/categories
// http://localhost:5000/api/products
app.use('/api', productRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
