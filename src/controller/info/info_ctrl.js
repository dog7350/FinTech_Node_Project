const service = require("../../service/info_service");
const renObj = require("../renObj");

const views = {
    infoView :  (req,res) => {
        // res.send("마이페이지");
        console.log("ctrl: ", req.session.user);
        const id = req.session.user;
        console.log("ctrl infoview: ", id);

        res.render("info/myPage", renObj(req,{id}));
    },
    modifyForm : async (req,res) => {
        const id = req.session.user;
        res.render("info/modifyForm", renObj(req,{id}));
    }
}

const process = {
    
    
}

module.exports = {views, process};