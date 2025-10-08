// routes/views.router.js
import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// Ruta raíz que redirige a /products
router.get("/", (req, res) => {
  res.redirect("/products");
});

// Ruta de productos con paginación
router.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query || null;

    // Obtenemos los productos con paginación
    const result = await productManager.getProducts({ limit, page, sort, query });

    // Renderizamos la vista
    res.render("index", {
      products: result.payload,
      page: result.page,
      totalPages: result.totalPages,
      prevLink: result.prevLink,
      nextLink: result.nextLink
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
    res.render("index", { products: [] });
  }
});

export default router;
