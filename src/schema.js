import { merge } from 'lodash';
import { gql } from 'apollo-server';
import userTypeDef from './user/userSchema';
import userResolvers from './user/userResolvers';
import messageTypeDef from './message/messageSchema';
import messageResolvers from './message/messageResolvers';

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
	],
	resolvers: merge( 
		userResolvers, 
		messageResolvers, 
	)
};
