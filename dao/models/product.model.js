import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: Number,
  code: { type: String, unique: true },
  status: { type: Boolean, default: true },
  thumbnails: [String]
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("products", productSchema);
export default Product;


