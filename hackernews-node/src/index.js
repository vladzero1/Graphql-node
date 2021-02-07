const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [{
  id: 'Link-0',
  description: 'fullstack tutorial for graohql',
  url: 'www.howtographql.com'
}];

let idCount = links.length
const resolvers = {
  Query: {
    info: () => 'Test',
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`);
});