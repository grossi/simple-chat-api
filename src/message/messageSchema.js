import { gql } from 'apollo-server';

const messageTypeDef = gql`
	type Message {
		id: ID!
		title: String
		text: String
		creator: User
	}
	extend type Query {
    messages: [Message]
		message(id: ID!): Message
	}
	extend type Mutation {
  	addMessage(title: String, text: String!): Message
	}
`;

export default messageTypeDef;
