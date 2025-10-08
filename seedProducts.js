import mongoose from "mongoose";
import ProductModel from "./dao/models/product.model.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = "mongodb+srv://candepereyraa15_db_user:H17SvpzD7EvOf5IT@cluster0.oitzu2a.mongodb.net/test?retryWrites=true&w=majority";
const products = [
  {
    title: "Camiseta deportiva",
    description: "Camiseta de algodón para entrenar",
    price: 1200,
    category: "ropa",
    status: true,
    stock: 20,
    thumbnail: "https://via.placeholder.com/150",
    code: "PRD001"
  },
  {
    title: "Zapatillas running",
    description: "Zapatillas cómodas para correr",
    price: 5000,
    category: "calzado",
    status: true,
    stock: 15,
    thumbnail: "https://via.placeholder.com/150",
    code: "PRD002"
  },
  {
    title: "Mochila escolar",
    description: "Mochila resistente con muchos bolsillos",
    price: 2500,
    category: "accesorios",
    status: true,
    stock: 10,
    thumbnail: "https://via.placeholder.com/150",
    code: "PRD003"
  },
  {
    title: "Gorra negra",
    description: "Gorra unisex negra",
    price: 800,
    category: "accesorios",
    status: true,
    stock: 30,
    thumbnail: "https://via.placeholder.com/150",
    code: "PRD004"
  }
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // 🔹 Limpiar la colección antes de insertar
    await ProductModel.deleteMany();
    console.log("🗑️ Colección 'products' limpiada");

    await ProductModel.insertMany(products);
    console.log("✅ Productos de prueba insertados");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seed();
