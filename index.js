const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
 dotenv.config()

const port = process.env.PORT;
const url = process.env.Database_URL;

 
app.use(cors());
app.use(bodyParser.json());

 
mongoose.connect(url, {
 
}).then(() => console.log('MongoDB Connected')).catch(err => console.error(err));

 
const productRoutes = require('./routes/products');
const billingRoutes = require('./routes/billing');

app.use('/products', productRoutes);
app.use('/billing', billingRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
