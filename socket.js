const {
  models: { Chat, User, Message },
} = require("./src/models");
const { Op } = require('sequelize');

function controllers(ServerSocket) {
  const io = require("socket.io")(ServerSocket);
  io.on("connection", (socket) => {
    //    console.log(socket);
    console.log("New Client is Connected!", socket.id);

    socket.on("userConnect", async (data, req, res) => {
      console.log("MessageRECEIVE: ", data, socket.id);

      // save soketid in user table and olinestatus on

      const userid = data.userId;
      const socketId = socket.id;
      // const decode = jwt.verify(token, secretKey); // Replace with your secret key
      const userExist = await User.findOne({ where: { id: userid } });
      if (!userExist) {
        return res.status(409).send("User not exist");
      }
      await userExist.update({ socketId, onlineStatus: true });
   
     
        socket.on("chat_message", async (message,req,res) => {
          console.log(message);
          const socketID = socket.id;
          // console.log(socketID,"LOLOLOLO");
          const chatID = message.chatid;
          const Messages = message.msg;
          const userDetail = await User.findOne({
            where: { socketId: socketID },
          });
          // console.log(userDetail,"lkjhyuuih");
          // const receverDetail = await User.findOne({ where: { id:receiverId } });
          // if (!userDetail) {
          //   return res
          //     .status(404)
          //     .json({ error: "Sender or receiver not found" });
          // }

          // if (!Messages && chatID) {
          //   return res
          //     .status(404)
          //     .json({ msg: "Message & ChatId is required." });
          // }
          const chatDetail = await Chat.findOne({
            where: { id: chatID, userId: { [Op.contains]: [userDetail.id] } },
          });

          // if (!chatDetail) {
          //   return res
          //     .status(200)
          //     .json({ message: "You Don't have any Chats" });
          // }

          if (chatDetail.chatType == "OneToOne") {
            const payload = {
              sender: chatDetail.userId[0],
              receiver: chatDetail.userId[1],
              message: Messages,
              chatid: chatDetail.id,
            };

            if (!(chatDetail.userId[0] === userDetail.id)) {
              payload.sender = chatDetail.userId[1];
              payload.receiver = chatDetail.userId[0];
            }
            const msg = await Message.create(payload);
            // return res
            //   .send({ message: "Message added sucessfully", msg })
            //   .status(200);
          }
          // const payload = {
          //   sender: userDetail.id,
          //   message: Messages,
          //   chatid: chatDetail.id,
          // };
          // const msg = await Message.create(payload);
          // return res
          //   .send({ message: "Message added sucessfully", msg })
          //   .status(200);

          // console.log("Message received:", msg);
        });
      });
        socket.on("disconnect", async function () {
          console.log("Got disconnect!");
          await userExist.update({ onlineStatus: false });
  
        });

        // set user offline and remoe socket id
   
  });
}

//

// socket.on("sendMsg", (data) => {

//     // fist validate all data

//     // save msg in massege table

//     // get reciver detail by user id

//     // socketid = reciver socket id
//     socket(socketid).emit("newMsg", (data) => {

//   });
//   socket.on('disconnect', function() {
//     console.log('Got disconnect!');

//     // set user offline and remoe socket id

//     });
//   });

module.exports = controllers;
