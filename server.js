const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

require('dotenv').config();

app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello CRUD API');
})

app.get('/blog', (req, res) => {
  res.send('Hello Blog. My name is Kigen');
})

app.get('/product', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({message: `cannot find any product with id ${id}`});
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})

app.patch('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({message: `cannot find any product with id ${id}`});
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.delete('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({message: `cannot find any product with id ${id}`});
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('CRUD Api app is running on port 3000')
    });
  })
  .catch((error) => {
    console.log(error);
  })