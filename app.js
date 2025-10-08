import express from "express";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import connectMongo from "./config/mongo.config.js";
import ProductManager from "./managers/ProductManager.js";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// 🔹 Conectá a Mongo antes de instanciar managers
await connectMongo();

// 🔹 Instanciá los managers después de la conexión
const productManager = new ProductManager();

// Configuración de Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Rutas de vistas
app.use("/", viewsRouter);

// WebSockets
io.on("connection", (socket) => {
  console.log("Cliente conectado via WebSocket");
});

// Levantar servidor
httpServer.listen(1011, () => {
  console.log("Servidor escuchando en http://localhost:1011");
});