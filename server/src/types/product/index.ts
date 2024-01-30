export interface IProductModel {
    url: string;
    bodyHtml: string;
}
export interface IProductResponse extends IProductModel {
    id: string;
    url: string;
    bodyHtml: string;
}

export interface IProductService {
    getAllProducts(): Promise<IProductResponse[]>;
    getProducts(): Promise<IProductResponse[]>;
}

export interface IProductRepository {
    getAll(): Promise<IProductResponse[]>;
    find(): Promise<IProductResponse[]>;
}
