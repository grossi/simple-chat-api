import { gql } from 'apollo-server';

const messageTypeDef = gql`
	type Message {
		id: ID!
		title: String
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
  	addMessage(title: String, text: String!): Message
	}
`;

export default messageTypeDef;
