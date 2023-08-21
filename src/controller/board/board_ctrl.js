const service = require("../../service/board_service");
const renObj = require("../renObj");
const cookieConfig = require("../../../config/cookie_config");

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

        const userCookie = req.cookies.myCookie;

        if(userCookie == undefined){ 
            res.cookie("myCookie", req.session.user.ID, cookieConfig); //쿠키 생성
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
    }
};

const process = {
    boardWrite : async (req,res) => {
        const msg = await service.insert.BoardInsert(req.body,req.session.user);
        const bno = await service.read.maxNumber();
        for(let i=0; i < req.files.length; i++) {
            const result =  await service.insert.fileName(bno,req.files[i].filename);
        }
        res.redirect("/board/boardList?category=all");
    },
    boardModifyForm : async (req,res) => {
        res.render("/board/modifyForm");
    },
    report : async (req, res) => {
        const result = await service.insert.report(req.body.bno, req.session.user.ID);
        if(result == 1 ){
            res.send(rtnMsg("게시글이 신고 되었습니다.", "/board/boardContent?bno="+req.body.bno));
        }else{
            res.send(rtnMsg("이미 신고 하셨습니다.", "/board/boardContent?bno="+req.body.bno));
        }
    }
};

module.exports = { views, process };