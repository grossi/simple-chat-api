const messageResolvers = {
	Query: {
        messages: async (_, {}, { dataSources }) => {
            return dataSources.mongoModels.Message.find();
        },
		message: async (_, { id }, { dataSources }) => {
            const targetMessage = await dataSources.mongoModels.Message.findById(id);
            if( !targetMessage )
                throw new Error(`Message Not Found.`);
            return targetMessage;
        }
	},
	Mutation: {
        addMessage: async (_, { text }, { dataSources, userId }) => {
            let newMessage = new dataSources.mongoModels.Message({
                text,
                creatorId: userId,
                timeStamp: Date.now()
            });
            return newMessage.save();
        },
    },
    Message: {
        creator: (message, {}, { dataSources }) => dataSources.mongoModels.User.findById(message.creatorId),
    }
};

module.exports = messageResolvers;
