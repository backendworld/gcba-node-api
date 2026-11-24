import * as ProductModel from '../models/products.model.js';

export const getAllProductsService = async () => {
  return await ProductModel.findAllProducts();
};

export const getProductByIdService = async (id) => {
  return await ProductModel.findProductById(id);
};

export const createProductService = async (data) => {
  if (!data.title || !data.price) {
    throw new Error('El título y el precio son obligatorios');
  }
  return await ProductModel.createProductModel(data);
};

export const deleteProductService = async (id) => {
  const product = await ProductModel.findProductById(id);
  if (!product) return false;
  await ProductModel.deleteProductModel(id);
  return true;
};