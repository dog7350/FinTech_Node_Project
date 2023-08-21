const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");
const { query } = require("express");

const views = {
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.bno);
        const boardFile = await service.read.boardFile(req.query.bno);
        const cmt = await service.read.cmt(req.query.bno);
        const boardReport = await service.read.boardReport(req.query.bno);
        
        let userCookie = req.cookies.myCookie;
        
        

        if(userCookie == undefined){ //if문으로 걸러서 쿠키가 있다면? 조회수증가하지마, 없다면? 증가해
            res.cookie("myCookie", "valueCookie", cookieConfig); //쿠키 생성
            await service.read.upHit(req.query.bno); //조회수 올리고
        }
        
        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt : cmt, boardReport : boardReport}))

    },
    list : async (req,res) => {
        
        const totalContent = await service.read.totalContent(req.query.category);

        
        const data = await service.read.list(req.query.start, totalContent, req.query.category);
        
        
        const category = req.query.category;
        res.render("board/boardList", renObj(req,{list:data.list, start:data.start, page:data.page, category:category}));

    },
    boardForm : (req,res) => {
        res.render("board/boardForm",renObj(req,{user : req.session.user}));
        
    },
    boardModifyForm : async (req,res) => {
        const content = await service.read.boardContent(req.params.bno);
        const boardFile = await service.read.boardFile(req.params.bno);
        
        res.render("board/modifyForm",renObj(req,{user : req.session.user, content : content, file : boardFile}));
    }

};

const process = {
    boardWrite : async (req,res) => {
        const msg = await service.insert.BoardInsert(req.body,req.session.user,req.files[0].filename);
        const bno = await service.read.maxNumber();
       
        for(let i=1; i < req.files.length; i++) {
            
            const result =  await service.insert.fileName(bno,req.files[i].filename);
        }
        res.redirect("/board/boardList?category=all");
    },

    boardModify : async (req,res) => {
        //board
        const result = await service.update.boardUpdate(req.body);
        //boardFile
        const resultDel = await service.remove.boardFileDel(req.body.bno);
        
        for(let i=0; i < req.files.length; i++) {
            const result =  await service.insert.fileName(req.body.bno,req.files[i].filename);
        }
        
        res.redirect("/board/boardContent?bno="+req.body.bno);
    },

    boardDel : async (req,res) => {
        
        const result = await service.remove.boardDele(req.params.bno);
        const resultDel = await service.remove.boardFileDel(req.body.bno);

        
        res.redirect("/board/boardList?category=all");
    }

}

module.exports = { views, process };