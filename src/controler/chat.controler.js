const {
    models: { Chat,User },
  } = require("../models");

  exports.create_chat = async (req, res) => {
    try {
      const { chatType,userId,createdBy,title } = req.body;
  
      if (!(chatType&&userId&&createdBy&&title )) {
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

      const user = await User.findAll({where:{id:userId}})
      if (user.length!=userId.length) {
       return res.send({message:"Users don't exists"}).status(404)
      }
      console.log(user.length,userId.length);
  
      const payload = {  chatType,userId,createdBy,title};
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