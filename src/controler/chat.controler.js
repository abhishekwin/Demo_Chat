const {
    models: { Chat,User },
  } = require("../models");
  const Op = require('sequelize')
  const dotenv = require("dotenv");
  dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

  exports.create_chat = async (req, res) => {
    try {
      const { chatType,createdBy,title } = req.body;
  
      if (!(chatType&&createdBy&&title )) {
        return res.status(400).json({ msg: "Username and Email is required." });
      }
      const oldChat = await Chat.findOne({
        where: {
          chatType: chatType,createdBy:createdBy,title:title
        },
      });
  
      if (oldChat) {
        return res.status(409).send("Chat Already Exist.");
      }

      const user = await User.findAll({where:{username:createdBy}})
      if (!user) {
       return res.send({message:"User don't exists"}).status(404)
      }
   
      const payload = {  chatType,createdBy,title,userId:[user[0].id]};
      const chat = await Chat.create(
        payload
      );
      res
        .send({ message: "Chat added sucessfully", chat})
        .status(200);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error registering chat" });
    }
  };

  exports.addUsers=async(req,res)=>{
    try {
  
      const usersId = req.body;
    
    const user  = await User.findOne({where:{id:req.decode.userId}})
    // console.log(user,"userrrr");
    const owner = await Chat.findAll({where:{createdBy:user.username,chatType:"GroupChat"}})
    if(!owner){
      res.send({message:"No Open Chats Create One"}).status(404)
    }
console.log(usersId.userId,"USRESESESE");
      const users = await User.findAll({
        where: {
          id: users.userId, // Use 'Op.contains' operator for array containment
          },
      });
  console.log(users,"uuuuu");
      res.status(200).json({ message:"Succesfull",users });
     
        
      
    

    } catch (error) {
      console.log(error,"lllll");
      res.status(500).json({ error: "Error registering chat" });
    }
  }