const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const viewsRouter = require("./routes/views");
const ProductManager = require("./managers/ProductManager");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 8080;

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// WebSocket
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("addProduct", async (product) => {
    try {
      await ProductManager.addProduct(product);
      const updatedProducts = await ProductManager.getProducts();
      io.emit("updateProducts", updatedProducts.payload);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
