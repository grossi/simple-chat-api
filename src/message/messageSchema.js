import { gql } from 'apollo-server';

const messageTypeDef = gql`
	type Message {
		id: ID!
		text: String
		creator: User
		timeStamp: String
	}
	extend type Query {
    messages(limit: Int): [Message]
		message(id: ID!): Message
	}
	extend type Subscription {
		newMessage: Message
	}
	extend type Mutation {
  	addMessage(text: String!): Message
	}
`;

export default messageTypeDef;
