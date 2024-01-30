import mongoose, { Schema } from 'mongoose';
import { IProductModel } from 'types/product';

const productSchema = new Schema<IProductModel>(
    {
        bodyHtml: String,
        url: String,
    },
    {
        timestamps: true,
    },
);

const ProductModel =
    mongoose.models.Product || mongoose.model('Product', productSchema);
export default ProductModel;
