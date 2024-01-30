import { ApiVersion, Session, shopifyApi } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';
import { InternalServerError } from 'lib/error';
import { Model } from 'mongoose';
import {
    IProductModel,
    IProductRepository,
    IProductResponse,
} from 'types/product';
class ProductRepository implements IProductRepository {
    private model: Model<IProductModel>;

    constructor(model: Model<IProductModel>) {
        this.model = model;
    }

    async find(): Promise<IProductResponse[]> {
        try {
            const products = (await this.model.find()) as IProductResponse[];
            return products;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while fetching products.',
            );
        }
    }

    async getAll(): Promise<any> {
        try {
            const shopify = shopifyApi({
                apiSecretKey: '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',
                apiVersion: ApiVersion.April23,
                isCustomStoreApp: true,
                adminApiAccessToken: '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',
                isPrivateApp: true,
                scopes: ['read_products'],
                isEmbeddedApp: false,
                restResources,
                hostName: 'cpb-new-developer.myshopify.com',
            });
            const sessionId = shopify.session.getOfflineId(
                'cpb-new-developer.myshopify.com',
            );
            const session = new Session({
                id: sessionId,
                shop: 'cpb-new-developer.myshopify.com',
                state: 'state',
                isOnline: false,
                accessToken: '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',
            });
            const client = new shopify.clients.Graphql({ session });
            const data = await client.query({
                data: `query {
                    products(first: 10) {
                      edges {
                        node {
                          id, 
                          bodyHtml, 
                          images(first: 10) {
                            nodes {
                                src
                            }
                          }
                        }
                      }
                    }
                }`,
            });
            this.model.create(
                (data as any).body.data.products.edges.map((item: any) => ({
                    url: item.node.images.nodes[0].src,
                    bodyHtml: item.node.bodyHtml,
                })),
            );
            return data;
        } catch (error) {
            console.log(error);
            throw new InternalServerError(
                'An error occurred while fetching products.',
            );
        }
    }
}

export default ProductRepository;
