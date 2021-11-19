const Product = require("../models/productModel");

const newProduct = async (input) => {
  let searchProductNew = await Product.findOne({ name: input.name });
  if (searchProductNew) {
    const addStock = searchProductNew.stock + input.stock;
    searchProductNew;

    searchProductNew = await Product.findOneAndUpdate(
      { _id: searchProductNew._id },
      { stock: addStock },
      { new: true }
    );
    return searchProductNew;
  }

  try {
    const product = new Product(input);
    const resp = await product.save();

    return resp;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const getProduct = async () => {
  try {
    const resp = await Product.find({}).limit(30);
    return resp;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const getProductById = async (id) => {
  try {
    const resp = await Product.findById(id);
    if (!resp) {
      throw new Error("Product not exist");
    }
    return resp;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const updateProduct = async (id, input) => {
  let resp = await Product.findById(id);
  if (!resp) {
    throw new Error("Product not exist");
  }

  resp = await Product.findOneAndUpdate({ _id: id }, input, { new: true });

  return resp;
};

const deleteProduct = async (id) => {
  let resp = await Product.findById(id);
  if (!resp) {
    throw new Error("Product not exist");
  }
  resp = await Product.findOneAndDelete(id);

  return "The product was removed";
};

module.exports = {
  newProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
