const { response } = require("express");
const ConversationModel = require("../models/conversation.model");
const MessageModel = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //Socket IO functinality will go here

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({
      status: "success",
      message: newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
         res.status(200).json([]);
    }
      
    res.status(200).json({
      status: "success",
      conversation: conversation.messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};
