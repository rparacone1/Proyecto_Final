const express = require("express");
const router = express.Router();
const CartManager = require("../managers/CartManager");

router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await CartManager.addProductToCart(cid, pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await CartManager.removeProductFromCart(cid, pid);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await CartManager.updateCart(cid, products);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const clearedCart = await CartManager.clearCart(cid);
    res.json(clearedCart);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
