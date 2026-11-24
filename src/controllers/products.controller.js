import * as ProductService from '../services/products.service.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductService.createProductService(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductService.deleteProductService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};