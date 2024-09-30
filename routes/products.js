const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/ProductManager");

router.get("/", async (req, res) => {
  try {
    const result = await ProductManager.getProducts(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.pid);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await ProductManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await ProductManager.updateProduct(
      req.params.pid,
      req.body
    );
    if (!updatedProduct)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const deletedProduct = await ProductManager.deleteProduct(req.params.pid);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
