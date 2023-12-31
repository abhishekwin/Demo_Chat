require("dotenv").config();
const {
  models: { User },
} = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;
const Sequelize = require("sequelize");

exports.create = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    if (!(email && username && password)) {
      return res.status(400).json({ msg: "Username and Email is required." });
    }
    const oldUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (oldUser) {
      return res.status(409).send("userDetail Already Exist. Please Login");
    }

    const payload = { username, email, phoneNumber,onlineStatus:true };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...payload,
      password: hashedPassword,
    });

    const jwtToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    res
      .send({ message: "userDetail added sucessfully", token: jwtToken })
      .status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ msg: "Username and Email is required." });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ error: "Unauthorized userDetail" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid Password" });
    } else {
      const jwtToken = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      res.send({ message: "Login sucessfully", jwtToken }).status(200);
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};
exports.get_users = async (req, res) => {
  try {
    const result = await User.findAll();

    res.send({ msg: "data fetched!!", count: result.length, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update_User=async(req,res)=>{
  

  try {
    phoneNumber = req.body.phoneNumber;
    email = req.body.email;
    // const decode = jwt.verify(token, secretKey); // Replace with your secret key
    const userExist = await User.findOne({where:{id:req.decode.userId}})
    if(!userExist){
        return res.status(409).send("User not exist");
    }
    if (phoneNumber && email) {
        // Update both fields
        await userExist.update({ phoneNumber, email });
      } else if (phoneNumber) {
        // Update only username
        await userExist.update({ phoneNumber });
      } else if (email) {
        // Update only email
        await userExist.update({ email });
      } else {
        return res.status(400).json({ error: 'At least one field is required for update' });
      }
  
      res.status(200).json({ message: 'User updated successfully',userExist });
   
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token is invalid" });
  }
};


exports.UserDetails=async(req,res)=>{
  const user  = await User.findOne({where:{id:req.decode.userId}})
  try {
    if(user){
      res.status(200).json({ message: 'User Details',user });
    }
    else{
      res.status(200).json({ message: 'User Not Found' });

    }
  } catch (error) {
    res.status(504).json({ message: 'User Not Found' });
    
  }

}

exports.searchUser= async (req, res) => {
  try {
    const searchQuery = req.query.q; // Get the search query from the request query parameters

    // Use Sequelize to perform the search
    const users = await User.findAll({
      where: {
        username: {
          [Sequelize.Op.iRegexp]: searchQuery // Use iLike for case-insensitive search
          
        }
      }
    });

      res.status(200).json({ message: 'User Found',users });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}