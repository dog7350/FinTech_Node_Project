const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fntcChatLogSchema = new Schema({
                                    site : String,
                                    img : String,
                                    id : String,
                                    nick : String,
                                    content : String
                                }, { timestamps : true });

module.exports = mongoose.model("fntcChatLog", fntcChatLogSchema);