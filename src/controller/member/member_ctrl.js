//const service = require("../../service/member_service");

const views = {
    joinForm : (req, res) => {
        res.render("member/joinForm");
    }
};

const process = {

};

module.exports = { views, process };