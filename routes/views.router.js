import express from "express";
import ProductManager from "../managers/ProductManager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("products", { products });
  } catch (error) {
    console.error("Error cargando productos:", error);
    res.render("products", { products: [], error: "Error cargando productos" });
  }
});

export default router;
