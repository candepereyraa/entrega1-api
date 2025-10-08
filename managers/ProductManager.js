import Product from "../dao/models/product.model.js";


class ProductManager {
  async getProducts() {
    return await Product.find().lean();
  }

  async addProduct(data) {
    return await Product.create(data);
  }
}

export default ProductManager;

