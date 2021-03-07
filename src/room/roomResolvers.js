const roomResolvers = {
  Query: {
    rooms: async (_, {}, { dataSources }) => {
      return dataSources.mongoModels.Room.find();
    },
    room: async (_, { id }, { dataSources }) => {
      const targetRoom = await dataSources.mongoModels.Room.findById(id);
      if (!targetRoom) throw new Error(`Room Not Found.`);
      return targetRoom;
    },
  },
  Mutation: {
    addRoom: async (_, { name }, { dataSources, userId }) => {
      let newRoom = new dataSources.mongoModels.Room({
        name,
        membersIds: [userId],
      });
      await newRoom.save();

      return newRoom;
    },
  },
  Room: {
    members: (room, {}, { dataSources }) =>
      dataSources.mongoModels.User.find({ _id: { $in: room.membersIds } }),
    messages: (room, {}, { dataSources }) =>
      dataSources.mongoModels.Message.find({ roomId: room.id }),
  },
};

module.exports = roomResolvers;
