const { gql } = require("apollo-server");


const typeDefs = gql`
  type User {
    id: ID
    name: String
    surName: String
    email: String
    create: String
  }
  type Token {
    token: String
  }
  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    create: String
  }
  type Client {
    id: ID
    name: String
    surName: String
    company: String
    email: String
    phone: String
    seller: ID
  }

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: Client
    seller: ID
    create: String
    state: StateOrder
  }
  type OrderGroup {
    id: ID
    amount: Int
    name: String
    price: Float
  }

  type TopClient {
    total: Float
    client: [Client]
  }
  type TopSeller {
    total: Float
    seller: [User]
  }

  input UserInput {
    name: String!
    surName: String!
    email: String!
    password: String!
  }
  input authInput {
    email: String!
    password: String!
  }
  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }
  input ClientInput {
    name: String!
    surName: String!
    company: String!
    email: String!
    phone: String
  }
  input OrderProductInput {
    id: ID
    amount: Int
    name: String
    price: Float
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    state: StateOrder
  }

  enum StateOrder {
    Pending
    Complete
    Cancel
  }

  #Querys
  type Query {
    #User
    getUser(token: String): User
    #product
    getProduct: [Product]
    getProductById(id: ID!): Product

    #client

    getClient: [Client]
    getClientBySeller: [Client]
    getOneClient(id: ID!): Client

    #orders
    getOrder: [Order]
    getOrderBySeller: [Order]
    getOneOrder(id: ID!): Order
    getOrderByState(state: String!): [Order]

    #advance Search

    betterClient: [TopClient]
    betterSeller: [TopSeller]
    searchProduct(text: String!): [Product]
  }

  #Mutations
  type Mutation {
    #User
    newUser(input: UserInput): User
    authUser(input: authInput): Token
    verifyToken(token: String): Boolean

    #Product
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    #Client
    newClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String

    #order
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): String
  }
`;

module.exports = {
  typeDefs,
};
