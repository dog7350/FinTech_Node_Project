const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");

const views = {
    list : async (req,res) => {
        console.log("req.query.start1 :", req.query.start, req.query.category);
        const totalContent = await service.read.totalContent(req.query.category);
        console.log("req.query.start1 :", req.query.start, req.query.category);
        const data = await service.read.list(req.query.start, totalContent, req.query.category);
        console.log("req.query.start2 :", data.start, data.list);
        const category = req.query.category;
        res.render("board/boardList", renObj(req,{list:data.list, start:data.start, page:data.page, category:category}));
    },

    content : async (req,res) => {
        let userCookie = req.signedCookies.myCookie;
        console.log("쿠키: ",userCookie);
        //if () {
        //    uphit
        //    cooki
        //}

        const data = await service.read.content(req.params.bno);
        res.render("board/content", {data});
    }

};


const process = {
    
};

module.exports = { views, process };