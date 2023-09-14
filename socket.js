const {
    models: { User },
  } = require("./src/models");

 function controllers (ServerSocket)
{
    const io = require("socket.io")(ServerSocket);
    io.on("connection",  (socket) => {
    //    console.log(socket);
        console.log("New Client is Connected!", socket.id);
    
        socket.on("userConnect", async(data,req,res) => {
          console.log("MessageRECEIVE: ", data, socket.id);

          // save soketid in user table and olinestatus on

   const userid = data.userId;
   const socketId = socket.id
    // const decode = jwt.verify(token, secretKey); // Replace with your secret key
    const userExist = await User.findOne({where:{id:userid}})
    if(!userExist){
        return res.status(409).send("User not exist");
    }
        await userExist.update({ socketId ,onlineStatus:true})

   
          socket.on('disconnect', async function() {
            console.log('Got disconnect!');
            await userExist.update({ onlineStatus:false })

            // set user offline and remoe socket id

            })
        })},
  )}
















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