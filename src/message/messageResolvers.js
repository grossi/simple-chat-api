const messageResolvers = {
	Query: {
        messages: async (_, { limit }, { dataSources }) => {
            if( limit ) { 
                let skip = (await dataSources.mongoModels.Message.countDocuments()) - limit;

                if (skip < 0) skip = 0;

                return dataSources.mongoModels.Message.find({}, null, { limit, skip: skip - limit });
            }
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
        addMessage: async (_, { text }, { dataSources, userId, pubsub }) => {
            let newMessage = new dataSources.mongoModels.Message({
                text,
                creatorId: userId,
                timeStamp: Date.now()
            });
            await newMessage.save();

            pubsub.publish(`NEW_MESSAGE`, { newMessage });

            return newMessage;
        },
    },
    Subscription: {
        newMessage: {
            subscribe: (_, {}, { pubsub }) =>{
                return pubsub.asyncIterator([`NEW_MESSAGE`]);
            }
        }
	},
    Message: {
        creator: (message, {}, { dataSources }) => dataSources.mongoModels.User.findById(message.creatorId),
    }
};

module.exports = messageResolvers;
