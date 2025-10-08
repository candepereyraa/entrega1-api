import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productsData = await productManager.getProducts({
    limit: limit ? parseInt(limit) : undefined,
    page: page ? parseInt(page) : undefined,
    sort,
    query,
  });

  if (productsData.status === "error") {
    return res.status(500).send(productsData.message);
  }

  // Renderizar la vista con los productos y paginación
  res.render("products", {
    products: productsData.payload,
    pagination: {
      page: productsData.page,
      totalPages: productsData.totalPages,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevLink: productsData.prevLink,
      nextLink: productsData.nextLink,
    },
  });
});

export default router;

