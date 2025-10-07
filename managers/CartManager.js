// managers/CartManager.js
import CartModel from "../dao/models/cart.model.js";

class CartManager {
  // Crear un nuevo carrito vacío
  async createCart() {
    try {
      const cart = await CartModel.create({ products: [] });
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  // Obtener carrito por id con populate
  async getCartById(cid) {
    try {
      const cart = await CartModel.findById(cid).populate("products.product").lean();
      if (!cart) return { status: "error", message: "Carrito no encontrado" };
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  // Agregar producto al carrito (si ya existe, suma cantidad)
  async addProduct(cid, pid, quantity = 1) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      const existing = cart.products.find((p) => p.product.toString() === pid);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }

      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      const product = cart.products.find((p) => p.product.toString() === pid);
      if (!product) return { status: "error", message: "Producto no encontrado en el carrito" };

      product.quantity = quantity;
      await cart.save();

      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  // Actualizar todos los productos del carrito (reemplaza array completo)
  async updateCart(cid, productsArray) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      cart.products = productsArray.map((p) => ({
        product: p.productId,
        quantity: p.quantity || 1,
      }));

      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  // Eliminar un producto del carrito
  async deleteProduct(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return { status: "error", message: "Carrito no encontrado" };

      cart.products = cart.products.filter((p) => p.product.toString() !== pid);
      await cart.save();
      return { status: "success", payload: cart };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  // Vaciar carrito
  async emptyCart(cid) {
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

