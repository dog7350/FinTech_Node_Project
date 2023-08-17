const service = require("../../service/board_service");
const renObj = require("../renObj");

const views = {
    boardList : async (req, res) =>{
        const list = await service.read.boardList();
        console.log("ctrl boardList : ", list);
        res.render("board/boardList", renObj(req, {list : list}))
    },
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.id);
        const boardFile = await service.read.boardFile(req.query.id);
        const cmt = await service.read.cmt(req.query.id);
        const boardReport = await service.read.boardReport(req.query.id);
        console.log("ctrl boardContent : ", content);
        console.log("ctrl boardFile : ", boardFile);
        console.log("ctrl boardFile : ", boardFile.length);
        console.log("ctrl cmt : ", cmt);
        console.log("ctrl cmt : ", cmt.length);
        console.log("ctrl boardReport : ", boardReport);
        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt : cmt, boardReport : boardReport }))
    }
};

const process = {

};

module.exports = { views, process };