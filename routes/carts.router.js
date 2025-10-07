import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// GET carrito por id
router.get("/:cid", async (req, res) => {
  const result = await cartManager.getCartById(req.params.cid);
  res.json(result);
});

// DELETE producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartManager.deleteProduct(cid, pid);
  res.json(result);
});

// PUT actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const result = await cartManager.updateProductQuantity(cid, pid, quantity);
  res.json(result);
});

// PUT actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body; // [{ productId, quantity }]
  const result = await cartManager.updateCart(cid, products);
  res.json(result);
});

// DELETE vaciar carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const result = await cartManager.emptyCart(cid);
  res.json(result);
});

export default router;
