import config from '../../config.json';
import jwt from 'jsonwebtoken'; 

const userResolvers = {
	Query: {
		user: async (_, { id }, { dataSources }) => {
            const targetUser = await dataSources.mongoModels.User.findById(id);
            if( !targetUser )
                throw new Error(`User Not Found.`);
            return targetUser;
        },
        myUser: async (_, { }, { userId, dataSources }) => {
            const targetUser = await dataSources.mongoModels.User.findById(userId);
            if( !targetUser )
                throw new Error(`User Not Found.`);
            return targetUser;
        },
        passwordSalt: async (_, { name }, { dataSources }) => {
            let existingUser = await dataSources.mongoModels.User.findOne({ name });
            if ( !existingUser )
                throw new Error(`Name not found.`);
            return existingUser.passwordSalt;
        }
	},
	Mutation: {
        addUser: async (_, { name, password, passwordSalt }, { dataSources }) => {
            let existingUser = await dataSources.mongoModels.User.findOne({ name });
            if ( existingUser )
                throw new Error(`Name Already Registered.`);
            let newUser = new dataSources.mongoModels.User({
                name,
                password,
                passwordSalt
            });
            return newUser.save();
        },
		authUser: async (_, { name, password }, { dataSources }) => {
            let user = await dataSources.mongoModels.User.findOne({ name, password });
            if( user ) {
                const token = jwt.sign({ userId: user._id }, config.secret, { "algorithm": "HS256", expiresIn: '24h' });
                user.lastLogin = Date.now();
                user.save();
                return token;
            } else {
                throw Error("User not found while trying to authenticate");
            }
        },
	},
};

module.exports = userResolvers;