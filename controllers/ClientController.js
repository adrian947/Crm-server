const { findOneAndUpdate } = require("../models/clientModel");
const Client = require("../models/clientModel");

const newClient = async (input, ctx) => {
  if (Object.keys(ctx).length === 0) {
    throw new Error("Invalid Token");
  }

  const verifyEmailClient = await Client.findOne({ email: input.email });
  if (verifyEmailClient) {
    throw new Error("The client has already been registered");
  }
  const resp = new Client(input);
  resp.seller = ctx.user.id;

  try {
    await resp.save();
    return resp;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getClient = async () => {
  try {
    const resp = await Client.find({}).limit(30);
    return resp;
  } catch (error) {
    console.log("error", error);
  }
};

const getClientBySeller = async (ctx) => {
  if (Object.keys(ctx).length === 0) {
    throw new Error("Invalid Token");
  }
  try {
    const resp = await Client.find({})
      .where({ seller: ctx.user.id })
      .populate("seller");    
    return resp;
  } catch (error) {
    console.log("error", error);
  }
};

const getOneClient = async (id, ctx) => {
  if (Object.keys(ctx).length === 0) {
    throw new Error("Invalid Token");
  }
  const resp = await Client.findById(id).populate("seller");

  if (!resp) {
    throw new Error("Client not exist");
  }

  if (resp.seller._id.toString() !== ctx.user.id) {
    throw new Error("You are not authorized to see this client");
  }

  return resp;
};

const updateClient = async (id, input, ctx) => {
  if (Object.keys(ctx).length === 0) {
    throw new Error("Invalid Token");
  }

  let resp = await Client.findById(id).populate("seller");
  if (!resp) {
    throw new Error("Client not exist");
  }

  if (resp.seller._id.toString() !== ctx.user.id) {
    throw new Error("You are not authorized to see this client");
  }
  resp = await Client.findOneAndUpdate({ _id: id }, input, {
    new: true,
  }).populate("seller");

  return resp;
};

const deleteClient = async (id, ctx) => {
  if (Object.keys(ctx).length === 0) {
    throw new Error("Invalid Token");
  }
  let resp = await Client.findById(id);
  if (!resp) {
    throw new Error("Client not exist");
  }
  if (resp.seller.toString() !== ctx.user.id) {
    throw new Error("You are not authorized to see this client");
  }
  resp = await Client.findOneAndDelete({ _id: id });

  return "Client remove";
};

module.exports = {
  newClient,
  getClient,
  getClientBySeller,
  getOneClient,
  updateClient,
  deleteClient,
};
