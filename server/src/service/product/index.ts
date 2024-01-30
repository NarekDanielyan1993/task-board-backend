import ProductRepository from 'repository/product';
import { IProductResponse, IProductService } from 'types/product';

class ProductService implements IProductService {
    private repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    public getAllProducts = async (): Promise<IProductResponse[]> =>
        await this.repository.getAll();

    public getProducts = async (): Promise<IProductResponse[]> =>
        await this.repository.find();
}
export default ProductService;
