import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    photo:String

})

let Product = mongoose.model('Product', productSchema)

export default Product;