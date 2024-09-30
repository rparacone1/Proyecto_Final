const Product = require("../models/product");

class ProductManager {
  async getProducts(options = {}) {
    try {
      const { limit = 10, page = 1, sort, query } = options;
      const filter = query ? { category: query } : {};
      const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

      const result = await Product.paginate(filter, {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOption,
        lean: true,
      });

      return {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}`
          : null,
        nextLink: result.hasNextPage
          ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}`
          : null,
      };
    } catch (error) {
      throw new Error("Error al obtener productos: " + error.message);
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error("Error al agregar producto: " + error.message);
    }
  }

  async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error("Error al obtener producto por ID: " + error.message);
    }
  }

  async updateProduct(id, updateData) {
    try {
      return await Product.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error("Error al actualizar producto: " + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error al eliminar producto: " + error.message);
    }
  }
}

module.exports = new ProductManager();
