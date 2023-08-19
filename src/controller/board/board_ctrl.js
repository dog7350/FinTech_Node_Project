const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");

const views = {
    boardList : async (req, res) =>{
        const list = await service.read.boardList();
        res.render("board/boardList", renObj(req, {list : list}))
    },
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.id); //게시글
        const boardFile = await service.read.boardFile(req.query.id);   //게시글 파일
        const cmt = await service.read.cmt(req.query.id);   //댓글
        const boardReport = await service.read.boardReport(req.query.id);  //게시글 조회수

        const userCookie = req.cookies.myCookie;
  
        console.log("쿠키: ", userCookie);

        if(userCookie == undefined){ //if문으로 걸러서 쿠키가 있다면? 조회수증가하지마, 없다면? 증가해
            res.cookie("myCookie", req.session.user.ID, cookieConfig); //쿠키 생성
            await service.read.upHit(req.query.id); //조회수 올리고
        }
        console.log("쿠키2: ", userCookie);

        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt, boardReport, userCookie}))
    }
};

const process = {

};

module.exports = { views, process };