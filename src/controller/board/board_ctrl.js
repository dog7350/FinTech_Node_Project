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
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.id); //게시글
        const boardFile = await service.read.boardFile(req.query.id);   //게시글 파일
        const cmt = await service.read.cmt(req.query.id);   //댓글
        const boardReport = await service.read.boardReport(req.query.id);  //게시글 신고수
        const cmtReport = await service.read.cmtReport(req.query.id);  //댓글 신고수

        const userCookie = req.cookies.myCookie;

        console.log("쿠키: ", userCookie);

        if(userCookie == undefined){ 
            res.cookie("myCookie", req.session.user.ID, cookieConfig); //쿠키 생성
            await service.read.upHit(req.query.id); //조회수 올리고
        }

        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt, boardReport, cmtReport}));
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
    },
    report : async (req, res) => {
        console.log("report", req.session.user)
        console.log("report", req.session.user.ID)
        const result = await service.insert.report(req.body.bno, req.session.user.ID);
        if(result == 1 ){
            res.send(rtnMsg("게시글이 신고 되었습니다.", "/board/boardContent?id="+req.body.bno));
        }else{
            res.send(rtnMsg("이미 신고 하셨습니다.", "/board/boardContent?id="+req.body.bno));
        }
    }
};

module.exports = { views, process };