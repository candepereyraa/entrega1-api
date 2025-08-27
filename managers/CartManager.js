const fs = require("fs/promises");

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this._readFile();
    const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartProducts(cid) {
    const carts = await this._readFile();
    const cart = carts.find(c => c.id == cid);
    return cart ? cart.products : null;
  }

  async addProductToCart(cid, pid) {
    const carts = await this._readFile();
    const cart = carts.find(c => c.id == cid);
    if (!cart) return null;

    const productInCart = cart.products.find(p => p.product == pid);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this._writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;