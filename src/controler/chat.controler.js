const {
  models: { Chat, User },
} = require("../models");
const Op = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

exports.create_chat = async (req, res) => {
  try {
    const { chatType, title, userIds } = req.body;
    const userDetail = await User.findOne({ where: { id: req.decode.userId } });

    if (!chatType) {
      return res.status(400).json({ msg: "ChatType is required." });
    }
    if (chatType == "GroupChat") {
      const chatExist = await Chat.findOne({
        where: {
          chatType: chatType,
          createdBy: userDetail.username,
          title: title,
        },
      });
      if (chatExist) {
        return res
          .send({ message: "Chat Already Exist", chatExist })
          .status(200);
      }
      const payload = { chatType, createdBy:userDetail.username, title, userId: [userDetail.id] };
      const chat = await Chat.create(payload);
      return res
        .send({ message: "GroupChat added sucessfully", chat })
        .status(200);
    } else {
      const chatExist = await Chat.findOne({
        where: {
          chatType: chatType,
          createdBy: userDetail.username,
          userId:  [userDetail.id,...userIds],
        },})
        if (chatExist) {
          return res
            .send({ message: "Chat Already Exist", chatExist })
            .status(200);
        }
      const payload = {
        chatType,
        createdBy: userDetail.username,
        userId: [userDetail.id,...userIds],
        title: title
      };
      const chat = await Chat.create(payload);
      return res.send({ message: "Chat added sucessfully", chat }).status(200);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error registering chat" });
  }
};

exports.addUsers = async (req, res) => {
  try {
    const usersId = req.body;
    const title = req.body.title;
    const user = await User.findOne({ where: { id: req.decode.userId } });

    const owner = await Chat.findAll({
      where: { createdBy: user.username, chatType: "GroupChat", title: title },
    });
    if (!owner) {
      return res.send({ message: "No Open Chats Create One" }).status(404);
    }
    console.log(usersId.usersId);
    const users = await User.findAll({
      where: {
        id: usersId.usersId, // Use 'Op.contains' operator for array containment
      },
    });
    console.log(owner,'ooooooo');
    if (users.length != usersId.usersId.length) {
       return res.status(404).json({ message: "Users dont exist" });
    } else {
      owner[0].update(
        {
          userId: Array.from(new Set([...usersId.usersId,...owner[0].userId]))
        },
        {
          where: {
            id: owner[0].id
          }
        }
      )
      res.status(200).json({ message: "Succesfull", owner });
    }
  } catch (error) {
console.log(error);
    res.status(500).json({ error: "Error registering chat" });
  }
};

exports.getChats=async(req,res)=>{
  try {
    const user = await User.findOne({ where: { id: req.decode.userId } });

    const getChat = await Chat.findAll({where:{createdBy:user.username}})
    console.log(getChat.userId,"llllll");
    // const UserData = await User.findAll({
    //   where:{
    //     id:
    //   }
    // })
    if (!getChat) {
      return res.status(200).json({message:"Chat not exists"})
    } else {
      res.status(200).json({message:"Chats fethched",getChat})
    }
  } catch (error) {
    res.status(400).json({message:"error fething chat",error})
    
  }
}
