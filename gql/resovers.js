const {newUser, authUser, getUser, verifyToken} = require('../controllers/authController')
const {newProduct, getProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/productController')
const {newClient, getClient, getClientBySeller, getOneClient, updateClient, deleteClient} = require('../controllers/clientController')
const {newOrder, getOrder, getOrderBySeller, getOneOrder, updateOrder, deleteOrder, getOrderByState} = require('../controllers/orderController')
const {betterClient, betterSeller, searchProduct} = require('../controllers/advanceController')


const resolvers = {
  Query: {
    getUser: (_, {token}, ctx) => getUser(token, ctx),
    getProduct:()=>getProduct(),
    getProductById:(_, {id})=>getProductById(id),
    getClient:()=>getClient(),
    getClientBySeller:(_, {}, ctx)=>getClientBySeller(ctx),
    getOneClient:(_, {id}, ctx)=>getOneClient(id, ctx),
    getOrder:(_, {})=>getOrder(),
    getOrderBySeller:(_, {}, ctx)=>getOrderBySeller(ctx),
    getOneOrder:(_, {id})=>getOneOrder(id),
    getOrderByState:(_, {state}, ctx)=>getOrderByState(state, ctx),
    betterClient:(_,{})=>betterClient(),
    betterSeller:(_,{})=>betterSeller(),
    searchProduct:(_,{text})=>searchProduct(text),
  },
  
  Mutation:{
    newUser:(_, {input}) => newUser(input),
    authUser:(_, {input})=>authUser(input),
    verifyToken:(_, {token})=>verifyToken(token),
    newProduct:(_, {input})=> newProduct(input),
    updateProduct:(_, {id, input})=>updateProduct(id, input),
    deleteProduct:(_, {id})=>deleteProduct(id),
    newClient:(_, {input}, ctx)=>newClient(input, ctx),
    updateClient:(_, {id, input}, ctx)=>updateClient(id, input, ctx),
    deleteClient:(_, {id}, ctx)=>deleteClient(id, ctx),
    newOrder:(_, {input}, ctx)=>newOrder(input, ctx),
    updateOrder:(_, {id, input}, ctx)=>updateOrder(id, input, ctx),
    deleteOrder:(_, {id}, ctx)=>deleteOrder(id, ctx),
    
  }
};

module.exports = {
  resolvers,
};
