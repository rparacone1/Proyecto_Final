const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/ProductManager");
const CartManager = require("../managers/CartManager");

router.get("/", async (req, res) => {
  try {
    const result = await ProductManager.getProducts(req.query);
    res.render("home", {
      products: result.payload,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        nextPage: result.nextPage,
        prevPage: result.prevPage,
      },
    });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const result = await ProductManager.getProducts(req.query);
    res.render("realTimeProducts", {
      products: result.payload,
    });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.pid);
    if (!product)
      return res
        .status(404)
        .render("error", { message: "Producto no encontrado" });
    res.render("product", { product });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    if (!cart)
      return res
        .status(404)
        .render("error", { message: "Carrito no encontrado" });
    res.render("cart", { cart });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

module.exports = router;
