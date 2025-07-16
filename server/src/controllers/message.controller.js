import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId ,io} from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (err) {
    console.log("error in getUsersForSidebar controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChatId  = req.params.id;

    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { receiverId: myId, senderId: userToChatId },
      ],
    });
    res.status(200).json(messages)
  } catch (err) {
    console.log("error in getMessages controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const {text,image} = req.body
    const receiverId = req.params.id

    const senderId= req.user._id
    
    let imageUrl;
    if(image){
        const uploadRes=await cloudinary.uploader.upload(image)
        imageUrl=uploadRes.secure_url
    }
    const newMessage =new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl

    })
    await newMessage.save()
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage)
  } catch (err) {
    console.log("error in sendMessages controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
