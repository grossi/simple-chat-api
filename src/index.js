import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoModels from './model';
import { typeDefs, resolvers } from './schema';
import _ from './db';
import verifyToken from './utils/verifyToken';

const app = express();

app.use(express.json());

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ mongoModels }),
  context: async ({ req }) => ({
    userId: await verifyToken(req.headers.authorization),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
