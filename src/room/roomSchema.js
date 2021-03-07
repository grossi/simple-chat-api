import { gql } from 'apollo-server';

const roomTypeDef = gql`
	type Room {
		id: ID!
		name: String
		members: [User]
    messages: [Message]
	}
	extend type Query {
    rooms: [Room]
		room(id: ID!): Room
	}
	extend type Mutation {
  	addRoom(name: String!): Room
	}
`;

export default roomTypeDef;
