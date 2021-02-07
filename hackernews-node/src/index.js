const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    info: String!
  }
`

const resolvers ={
    Query:{
      info: () => 'Test'
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({url})=>{
  console.log(`server is running on ${url}`);
});