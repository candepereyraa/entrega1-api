import Product from "../dao/models/product.model.js";

class ProductManager {
  // Método para frontend con paginación, filtro y orden
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      const filter = {};
      if (query) {
        // Filtrar por status (true/false) o categoría
        if (query === "true" || query === "false") filter.status = query === "true";
        else filter.category = query;
      }

      // Ordenamiento por precio
      let sortOption = {};
      if (sort === "asc") sortOption.price = 1;
      else if (sort === "desc") sortOption.price = -1;

      // Conteo total de documentos que cumplen filtro
      const totalDocs = await Product.countDocuments(filter);

      // Calcular total de páginas
      const totalPages = Math.ceil(totalDocs / limit);
      const skip = (page - 1) * limit;

      // Buscar productos
      const docs = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean();

      return {
        status: "success",
        payload: docs,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink: page > 1 ? `/products?page=${page - 1}&limit=${limit}&sort=${sort || ""}&query=${query || ""}` : null,
        nextLink: page < totalPages ? `/products?page=${page + 1}&limit=${limit}&sort=${sort || ""}&query=${query || ""}` : null,
      };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async getById(pid) {
    try {
      const product = await Product.findById(pid).lean();
      if (!product) return { status: "error", message: "Producto no encontrado" };
      return { status: "success", payload: product };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async addProduct(data) {
    return await Product.create(data);
  }
}

export default ProductManager;

