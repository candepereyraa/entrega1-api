import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// Traer carrito por id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const result = await cartManager.getCartById(cid);
  res.send(result);
});

// Agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const result = await cartManager.addProductToCart(cid, pid, quantity || 1);
  res.send(result);
});

// Actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const result = await cartManager.updateProductQuantity(cid, pid, quantity);
  res.send(result);
});

// Actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const productsArray = req.body.products; // [{product: pid, quantity: x}, ...]
  const result = await cartManager.updateCartProducts(cid, productsArray);
  res.send(result);
});

// Eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartManager.removeProduct(cid, pid);
  res.send(result);
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const result = await cartManager.clearCart(cid);
  res.send(result);
});

export default router;
