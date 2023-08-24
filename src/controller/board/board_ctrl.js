const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");
const { query } = require("express");
const fs = require("fs");

const rtnMsg = (msg, url) => {
    var str = `
                <script>
                    alert('${msg}');
                    location.href='${url}';
                </script>
              `;
    return str;
}

const views = {
    main : async (req, res) => {
        const data = await service.read.main();

        res.render("index", renObj(req, {list : data.list.rows, notice : data.notice.rows, sell : data.sell.rows, star : data.star.rows}));
    },
    boardSearch : async (req, res) => {
        const totalContent = await service.read.searchTotalContent(req.query.searchTxt, req.query.searchCat);

        const data = await service.read.searchList(req.query.start, totalContent, req.query.searchTxt, req.query.searchCat);
        const notice = await service.read.noticeList();
        
        const category = "all";
        res.render("board/boardList", renObj(req, {list:data.list, notice:notice, start:data.start, page:data.page, category:category}));
    },
    boardContent : async (req, res) =>{
        if (req.session.user == undefined) {
            res.send(rtnMsg("로그인이 필요합니다.", "/"));
            return;
        }
        
        const content = await service.read.boardContent(req.query.bno); //게시글
        const boardFile = await service.read.boardFile(req.query.bno);   //게시글 파일
        const cmt = await service.read.cmt(req.query.bno);   //댓글
        const boardReport = await service.read.boardReport(req.query.bno);  //게시글 신고수
        const cmtReport = await service.read.cmtReport(req.query.bno);  //댓글 신고수

        bno = req.query.bno;
        if (Object.keys(req.cookies).indexOf(bno) == -1) {
            res.cookie(bno, bno, cookieConfig);
            await service.read.upHit(req.query.bno); //조회수 올리고
        }

        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt, boardReport, cmtReport}));
    },
    list : async (req,res) => {
        const totalContent = await service.read.totalContent(req.query.category);
        const data = await service.read.list(req.query.start, totalContent, req.query.category);
        const notice = await service.read.noticeList();

        const category = req.query.category;
        res.render("board/boardList", renObj(req,{list:data.list, notice:notice, start:data.start, page:data.page, category:category}));
    },
    boardForm : (req,res) => {
        if (req.session.user == undefined) {
            res.send(rtnMsg("로그인이 필요합니다.", "/"));
            return;
        }

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
        let file = ""
        if (req.files.length > 1) file = req.files[0].filename;
        else file = "DefaultThumbnail.jpg";

        if (req.files.length > 1) {
            const msg = await service.insert.BoardInsert(req.body,req.session.user,file);
            const bno = await service.read.maxNumber();
    
            for(let i=1; i < req.files.length; i++) {
                const result =  await service.insert.fileName(bno,req.files[i].filename);
            }
        } else {
            const msg = await service.insert.BoardInsert(req.body,req.session.user,file);
            if (req.files.length == 1) {
                const bno = await service.read.maxNumber();
                await service.insert.fileName(bno,req.files[0].filename);
            }
        }

        res.redirect("/board/boardList?category=all");
    },
    report : async (req, res) => {
        const result = await service.insert.report(req.body.bno, req.session.user.ID);
        if(result == 1 ){
            res.send(rtnMsg("게시글이 신고 되었습니다.", "/board/boardContent?bno="+req.body.bno));
        }else{
            res.send(rtnMsg("이미 신고 하셨습니다.", "/board/boardContent?bno="+req.body.bno));
        }
    },
    boardModify : async (req,res) => {
        //board
        const boardInfo = await service.read.boardContent(req.body.bno);
        const readFile = await service.read.boardFile(req.params.bno);

        if (boardInfo["THUMBNAIL"] != "DefaultThumbnail.jpg") fs.unlinkSync(`./upload/${boardInfo["THUMBNAIL"]}`);
        for (j = 0; j < readFile.length; j++) fs.unlinkSync(`./upload/${readFile[j].FILENAME}`);

        await service.remove.boardFileDel(req.body.bno);
        //
        let upfile = "";
        if (req.files.length > 1) upfile = req.files[0].filename;
        else upfile = "DefaultThumbnail.jpg";
        
        if (req.files.length > 1) {
            for(let i=1; i < req.files.length; i++) {
                const msg =  await service.insert.fileName(req.body.bno, req.files[i].filename);
            }
        } else if (req.files.length == 1) {
            const msg =  await service.insert.fileName(req.body.bno, req.files[0].filename);
        }
        
        const result = await service.update.boardUpdate(req.body, upfile);
        
        res.redirect("/board/boardContent?bno="+req.body.bno);
    },
    boardDel : async (req,res) => {
        const readFile = await service.read.boardFile(req.params.bno);
        const resultDel = await service.remove.boardFileDel(req.params.bno);
        const result = await service.remove.boardDele(req.params.bno);
        for(let i=0; i < readFile.length; i++){
            fs.unlinkSync(`./upload/${readFile[i]["FILENAME"]}`);
        }
        res.redirect("/board/boardList?category=all");
    }
};

module.exports = { views, process };