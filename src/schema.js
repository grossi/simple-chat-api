import { merge } from 'lodash';
import { gql } from 'apollo-server';
import userTypeDef from './user/userSchema';
import userResolvers from './user/userResolvers';
import messageTypeDef from './message/messageSchema';
import messageResolvers from './message/messageResolvers';
import roomTypeDef from './room/roomSchema';
import roomResolvers from './room/roomResolvers';

const queryTypeDef = gql`
	type Query
	type Mutation
	type Subscription
`;

module.exports = {
	typeDefs: [ 
		queryTypeDef,
		userTypeDef,
		messageTypeDef,
		roomTypeDef,
	],
	resolvers: merge( 
		userResolvers, 
		messageResolvers, 
		roomResolvers,
	)
};
