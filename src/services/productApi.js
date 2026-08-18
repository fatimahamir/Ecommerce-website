
import axiosInstance from "../api/axiosInstance";


export const getAllProducts = (limit = 100) =>
  axiosInstance.get(`/products?limit=${limit}`);


export const getProductById = (id) =>
  axiosInstance.get(`/products/${id}`);

export const getCategories = () =>
  axiosInstance.get("/products/categories");


export const getProductsByCategory = (category) =>
  axiosInstance.get(`/products/category/${category}`);


export const searchProducts = (query) =>
  axiosInstance.get(`/products/search?q=${query}`);