const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./gql/schema");
const { resolvers } = require("./gql/resovers");
const { connectDB } = require("./db/config");
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRETA
        );
        
        return { user };
      } catch (error) {
        console.log("error", error);
      }
    }
  },
});

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`Server ready in URL ${url}`);
});
