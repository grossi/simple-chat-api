import { gql } from 'apollo-server';

const userTypeDef = gql`
	type User {
		id: ID!
		name: String!
		password: String!
		passwordSalt: String
		lastLogin: String
	}
	extend type Query {
		user(id: ID!): User
		myUser: User
		passwordSalt(name: String!): String
	}
	extend type Mutation {
    addUser(name: String!, password: String!, passwordSalt: String): User
		authUser(name: String!, password: String!): String
	}
`;

export default userTypeDef;
