import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import http from 'http';
import cors from 'cors';
import mongoModels from './model';
import { typeDefs, resolvers } from './schema';
import _ from './db';
import verifyToken from './utils/verifyToken';

const pubsub = new PubSub();

const app = express();

app.use(express.json());

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ mongoModels }),
  context: async ({ connection, req }) => {
    if (connection) {
      let token = connection.context.authorization;
      if ( !token ) {
        token = connection.context.Authorization;
        if( !token && connection.context.headers )
          token = connection.context.headers.Authorization;
      }
      return {
        userId: await verifyToken(token),
        pubsub,
        dataSources: { mongoModels },
      };
    }
    if (req) {
      return {
        userId: await verifyToken(req.headers.authorization),
        pubsub
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
