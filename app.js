import express from "express";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js"; // ajusta ruta según tu repo

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager("./data/products.json"); // ajusta a tu implementación

// Configuración de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas
app.use("/", viewsRouter);

// WebSockets
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // Emitir lista inicial
  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  // Escuchar nuevo producto
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    const updated = await productManager.getProducts();
    io.emit("updateProducts", updated);
  });

  // Escuchar eliminar producto
  socket.on("deleteProduct", async (id) => {
    if (typeof productManager.deleteProduct === "function") {
      await productManager.deleteProduct(id);
      const updated = await productManager.getProducts();
      io.emit("updateProducts", updated);
    }
  });
});

// Levantar servidor
httpServer.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080");
});