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
    feed: () => links,
    link: (parent, {id}) => {
      const link = links.find(link => link.id === id);
      return link;
    } 
  },
  Mutation: {
    post: (parent, {description, url}) => {
      const link = {
        id: `link-${idCount++}`,
        url: url,
        description: description
      };
      links.push(link);
      return link
    },
    updateLink: (parent, {id, url, description}) => {
      const newLink = {
        id: id,
        description: description,
        url: url
      };
      const linkIndex = links.findIndex(link => link.id === id);
      links[linkIndex] = newLink;
      return newLink;
    },
    deleteLink: (parent, {id}) => {
      const linkIndex = links.findIndex(link => link.id === id);
      const link = links[linkIndex];
      links.splice(linkIndex,1);
      return link;
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