import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  thumbnail: { type: String },
});

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;

