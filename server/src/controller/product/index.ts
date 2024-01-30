import { NextFunction, Request, Response } from 'express';
import { IProductService } from 'types/product';

export default class ProductController {
    private productService: IProductService;

    constructor(productService: IProductService) {
        this.productService = productService;
    }

    public getAllProducts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    public getProducts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const products = await this.productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };
}
