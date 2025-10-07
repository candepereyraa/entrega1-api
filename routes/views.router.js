import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import CartModel from "../dao/models/cart.model.js";

const router = Router();
const productManager = new ProductManager();

// Ruta principal / y /products → lista de productos
router.get(["/", "/products"], async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const result = await productManager.getAll({
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
      sort,
      query,
    });

    // Construir prevLink y nextLink
    const baseUrl = req.baseUrl + req.path;
    const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit || 10}` : null;
    const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit || 10}` : null;

    res.render("index", {
      products: result.docs,   // Productos de la página actual
      pagination: {
        totalPages: result.totalPages,
        page: result.page,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink,
        nextLink,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando productos");
  }
});

// Ruta carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate("products.product").lean();

    if (!cart) return res.status(404).send("Carrito no encontrado");

    res.render("cart", { cart });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando carrito");
  }
});

export default router;
