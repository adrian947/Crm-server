const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const betterClient = async () => {
  const resp = await Order.aggregate([
    { $match: { state: "Complete" } },
    {
      $group: {
        _id: "$client",
        total: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "_id",
        foreignField: "_id",
        as: "client",
      },
    },
    {
      $limit: 10,
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return resp;
};

const betterSeller = async () => {
  const resp = await Order.aggregate([
    { $match: { state: "Complete" } },
    {
      $group: {
        _id: "$seller",
        total: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "seller",
      },
    },
    {
      $limit: 3,
    },
    {
      $sort: { total: -1 },
    },
  ]);
  return resp;
};

const searchProduct = async (text) => {
  const resp = await Product.find({ name: { $regex: new RegExp(text) } });

  return resp;
};

module.exports = {
  betterClient,
  betterSeller,
  searchProduct,
};
