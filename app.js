const express = require('express');
const ProductManager = require('./managers/ProductManager');
const CartManager = require('./managers/CartManager');
const productsRouter = express.Router();
const app = express();
const PORT = 8080;

const productManager = new ProductManager('./data/products.json');
const cartManager = new CartManager('./data/carts.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para productos
app.get('/api/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

app.get('/api/products/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.post('/api/products', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

app.put('/api/products/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.delete('/api/products/:pid', async (req, res) => {
  const products = await productManager.deleteProduct(parseInt(req.params.pid));
  res.json(products);
});

// Rutas para carritos
app.post('/api/carts', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

app.get('/api/carts/:cid', async (req, res) => {
  const products = await cartManager.getCartProducts(parseInt(req.params.cid));
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cart = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito o producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});