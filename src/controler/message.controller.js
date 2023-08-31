const {
  models: { Chat, User, Message },
} = require("../models");
const Op = require("sequelize");

exports.sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userDetail = await User.findOne({ where: { id: req.decode.userId } });

    if (!message && chatId) {
      return res.status(400).json({ msg: "Message & ChatId is required." });
    }
    const chatDetail = await Chat.findOne({
      where: { id: chatId},
    });
    if (!chatDetail) {
      return res.status(200).json({ message: "You Don't have any Chats" });
    }
    if (chatDetail.chatType == "OneToOne") {
      if (chatDetail.createdBy!=userDetail.username) {
        return res.status(200).json({message:"You are not owner"});
      }
      const receivers = chatDetail.userId[1];
      const payload = {
        sender: userDetail.id,
        receiver:receivers,
        message:message,
        chatid: chatDetail.id,
      };
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

exports.getMessage = async(req,res)=>{
  try {
   
    const userDetail = await User.findOne({ where: { id: req.decode.userId } });
    const chatDetail = await Chat.findOne({where:{id:req.query.chatId}});
    if (chatDetail.chatType=="OneToOne") {

      const msgInfo = await Message.findAll({where:{sender:userDetail.id,chatid:req.query.chatId}})
      return res.status(200).json({message:"Message Fetched Succesfully",msgInfo})
    }
    const msgInfo = await Message.findAll({where:{chatid:req.query.chatId}})

    res.status(200).json({message:"Succesfull",msgInfo})
  } catch (error) {
 
    return res.send({ message: "Error", error }).status(200);
  
  }
}