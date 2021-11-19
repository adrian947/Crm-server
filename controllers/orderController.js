const Client = require("../models/clientModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const newOrder = async (input, ctx) => {
  const verifyClient = await Client.findById({ _id: input.client });
  
  if (!verifyClient) {
    throw new Error("Client not exist");
  }
  
  if (verifyClient.seller.toString() !== ctx.user.id.toString()) {
    throw new Error("You are not authorized to see this client");
  }

  for await (const article of input.order) {
    const verifyStock = await Product.findById({ _id: article.id });

    if (article.amount > verifyStock.stock) {
      throw new Error(
        `The item ${verifyStock.name} exceeds the available quantity`
      );
    } else {
      verifyStock.stock = verifyStock.stock - article.amount;
      await verifyStock.save()
    }
  }

  const newOrder = new Order(input);
  newOrder.seller = ctx.user.id;

  const resp = await newOrder.save();
  return resp;
};

const getOrder = async () => {
  try {
    const resp = await Order.find().limit(30);
    return resp;
  } catch (error) {
    console.log("error", error);
  }
};

const getOrderBySeller = async (ctx) => {
  try {
    const resp = await Order.find({ seller: ctx.user.id }).populate("client");

    return resp;
  } catch (error) {
    console.log("error", error);
  }
};

const getOneOrder = async (id) => {
  try {
    const resp = await Order.findById(id);
    return resp;
  } catch (error) {
    console.log("error", error);
  }
};

const updateOrder = async (id, input, ctx) => {
  const verifyOrder = await Order.findById(id);
  if (!verifyOrder) {
    throw new Error("Order not exist");
  }
  const verifyClient = await Client.findById({ _id: input.client });
  if (!verifyClient) {
    throw new Error("Client not exist");
  }

  if (verifyClient.seller.toString() !== ctx.user.id.toString()) {
    throw new Error("You are not authorized to see this client");
  }
  if (input.order) {
    for await (const article of input.order) {
      const verifyStock = await Product.findById({ _id: article.id });

      if (article.amount > verifyStock.stock) {
        throw new Error(
          `The item ${verifyStock.name} exceeds the available quantity`
        );
      } else {
        verifyStock.stock = verifyStock.stock - article.amount;
        await Product.findByIdAndUpdate(
          { _id: verifyStock._id },
          { stock: verifyStock.stock }
        );
      }
    }
  }

  const resp = await Order.findOneAndUpdate({ _id: id }, input, {
    new: true,
  });

  return resp;
};

const deleteOrder = async (id, ctx) => {
  const verifyOrder = await Order.findById(id);
  if (!verifyOrder) {
    throw new Error("Order not exist");
  }

  if (verifyOrder.seller.toString() !== ctx.user.id.toString()) {
    throw new Error("You are not authorized to see this client");
  }

  await Order.findOneAndDelete({ _id: id });

  return "Order delete";
};

const getOrderByState = async (state, ctx) => {
  const resp = await Order.find({ seller: ctx.user.id, state });

  return resp;
};

module.exports = {
  newOrder,
  getOrder,
  getOrderBySeller,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getOrderByState,
};
