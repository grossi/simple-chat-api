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
	}
	extend type Mutation {
    addUser(name: String!, password: String!, passwordSalt: String): User
		authUser(name: String!, password: String!): String
		passwordSalt(name: String!): String
	}
`;

export default userTypeDef;
