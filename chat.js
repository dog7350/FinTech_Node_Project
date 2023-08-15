const mongoose = require("mongoose");
const chatLog = require("./config/mongo_config");
const httpServer = require("./app").http;
const io = require("./app").io;

io.on('connection', (socket) => {
    try {
        mongoose.connect('mongodb://fntc:fntc@fntc.kro.kr:27017/fntcChatLog', { useNewUrlParser: true }, (err, db) => {});
    } catch (e) {
        console.log(e);
    }
    mongoose.connection.on("error", console.error.bind(console, "연결 오류 : "));

    socket.on("chat message", (msg) => {
        var str = String(msg).split('|');

        var site = str[0];
        var img = str[1];
        var id = str[2];
        var content = str[3];
        var nick = content.split(':')[0];
        content = content.replace(nick + ": ", "");
        
        var chat = new chatLog();
        chat.site = site;
        chat.img = img;
        chat.id = id;
        chat.nick = nick;
        chat.content = content;
        chat.save((err, data) => { if (err) { console.log(err); } });

        io.emit('chat message', msg);
    });

    socket.on("disconnect", () => {
        try {
            mongoose.disconnect();
        } catch (error) {
            console.log(error);
        }
    });
});

httpServer.listen(3000, "0.0.0.0", () => { console.log("Server Starting...") });