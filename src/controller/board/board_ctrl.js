const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");

const views = {
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.bno);
        const boardFile = await service.read.boardFile(req.query.bno);
        const cmt = await service.read.cmt(req.query.bno);
        const boardReport = await service.read.boardReport(req.query.bno);
        
        let userCookie = req.cookies.myCookie;
  
        console.log("쿠키: ", userCookie);

        if(userCookie == undefined){ //if문으로 걸러서 쿠키가 있다면? 조회수증가하지마, 없다면? 증가해
            res.cookie("myCookie", "valueCookie", cookieConfig); //쿠키 생성
            await service.read.upHit(req.query.bno); //조회수 올리고
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

    },
    boardForm : (req,res) => {
        res.render("board/boardForm",renObj(req,{user : req.session.user}));
        console.log(renObj(req,{}));
    }
};

const process = {
    boardWrite : async (req,res) => {
        const msg = await service.insert.BoardInsert(req.body,req.session.user);
        const bno = await service.read.maxNumber();
        // console.log(bno);
        for(let i=0; i < req.files.length; i++) {
            const result =  await service.insert.fileName(bno,req.files[i].filename);
        }
        res.redirect("/board/boardList?category=all");
    },

    boardModifyForm : async (req,res) => {
        res.render("/board/modifyForm");
    }

}

module.exports = { views, process };