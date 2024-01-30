import { PRODUCT_API } from 'constant/api';
import ProductController from 'controller/product';
import express, { Router } from 'express';
import ProductModel from 'model/product';
import ProductRepository from 'repository/product';
import ProductService from 'service/product';

const productRepository = new ProductRepository(ProductModel);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const productRoutes: Router = express.Router();

productRoutes.get(PRODUCT_API.GET_ALL, productController.getProducts);

export default productRoutes;
