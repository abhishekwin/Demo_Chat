const {
  models: { Chat, User, Message },
} = require("../models");
const { Op } = require('sequelize');


exports.sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userDetail = await User.findOne({ where: { id: req.decode.userId } });
    // const receverDetail = await User.findOne({ where: { id:receiverId } });
if (!userDetail) {
  return res.status(404).json({ error: 'Sender or receiver not found' });
}

    if (!message && chatId) {
      return res.status(404).json({ msg: "Message & ChatId is required." });
    }
    const chatDetail = await Chat.findOne({
      where: { id: chatId, userId: { [Op.contains]: [userDetail.id] }},
    });


    if (!chatDetail) {
      return res.status(200).json({ message: "You Don't have any Chats" });
    }

    if (chatDetail.chatType == "OneToOne") {
   
      const payload = {
        sender: chatDetail.userId[0],
        receiver: chatDetail.userId[1],
        message: message,
        chatid: chatDetail.id,
       };

 if (!(chatDetail.userId[0]===userDetail.id)){

   payload.sender = chatDetail.userId[1]
  payload.receiver = chatDetail.userId[0]

}
const msg = await Message.create(payload);
return res
.send({ message: "Message added sucessfully", msg })
.status(200);
}
    const payload = { sender: userDetail.id, message, chatid: chatDetail.id };
    const msg = await Message.create(payload);
    return res.send({ message: "Message added sucessfully", msg }).status(200);
  } catch (error) {
    console.log(error);
    return res.send({ message: "Error", error }).status(200);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const userDetail = await User.findOne({ where: { id: req.decode.userId } });
    const chatDetail = await Chat.findOne({ where: { id: req.query.chatId } });
    
    const whereClause = {};
    if (req.query.chatId) {
      whereClause.chatid = +req.query.chatId;
    }
    
    const sender = req.decode.userId;

    console.log(userDetail.id);
    
    if (userDetail.id) {
      whereClause.sender == userDetail.id ||
        whereClause.receiver == userDetail.id;
    }

    if (chatDetail.chatType == "OneToOne") {
     
      console.log(whereClause);
      const msgInfo = await Message.findAll({
        where: whereClause,
        include:[
          {model:User, as: 'userSender', attributes: ['id', 'username'] },
          {model:User, as: 'userReceiver', attributes: ['id', 'username'] },
        ] 
      });
     
     
      if (msgInfo.length==0) {
      return res.status(200).json({message:"No Message Found",msgInfo})
     }

      return res
        .status(200)
        .json({ message: "Message Fetched Succesfully", msgInfo});
    }

    const msgInfo = await Message.findAll({
      where:whereClause , include:[
        {model:User, as: 'userSender', attributes: ['id', 'username'] },]
    });
    if (msgInfo.length==0) {
      return res.status(200).json({message:"No Message Found",msgInfo})
     }

    res.status(200).json({ message: "Succesfull", msgInfo });
  } catch (error) {
    console.log(error);
    return res.send({ message: "Error", error }).status(200);
  }
};
