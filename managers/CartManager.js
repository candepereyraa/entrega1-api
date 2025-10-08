import CartModel from "../dao/models/cart.model.js";

class CartManager {
  async getCartById(cid) {
    try {
      // Usamos populate para traer los productos completos
      const cart = await CartModel.findById(cid).populate("products.product").lean();
      if (!cart) return { status: "error", message: "Carrito no encontrado" };
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async addProductToCart(cid, pid, quantity = 1) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      const existingProduct = cart.products.find(p => p.product.toString() === pid);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }

      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      const product = cart.products.find(p => p.product.toString() === pid);
      if (!product) return { status: "error", message: "Producto no encontrado en el carrito" };

      product.quantity = quantity;
      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async updateCartProducts(cid, productsArray) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      // productsArray = [{ product: pid, quantity: x }, ...]
      cart.products = productsArray;
      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async removeProduct(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      cart.products = cart.products.filter(p => p.product.toString() !== pid);
      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async clearCart(cid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      cart.products = [];
      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }
}

export default CartManager;

