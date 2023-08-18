const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");

const views = {
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.id);
        const boardFile = await service.read.boardFile(req.query.id);
        const cmt = await service.read.cmt(req.query.id);
        const boardReport = await service.read.boardReport(req.query.id);
        
        let userCookie = req.cookies.myCookie;
  
        console.log("쿠키: ", userCookie);

        if(userCookie == undefined){ //if문으로 걸러서 쿠키가 있다면? 조회수증가하지마, 없다면? 증가해
            res.cookie("myCookie", "valueCookie", cookieConfig); //쿠키 생성
            await service.read.upHit(req.query.id); //조회수 올리고
        }

        console.log("123", content)
        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt : cmt, boardReport : boardReport}))

    },
    list : async (req,res) => {
        console.log("req.query.start1 :", req.query.start, req.query.category);
        const totalContent = await service.read.totalContent(req.query.category);

        console.log("req.query.start1 :", req.query.start, req.query.category);
        const data = await service.read.list(req.query.start, totalContent, req.query.category);
        
        console.log("req.query.start2 :", data.start, data.list);
        const category = req.query.category;
        res.render("board/boardList", renObj(req,{list:data.list, start:data.start, page:data.page, category:category}));

    }
};


const process = {
    
};

module.exports = { views, process };