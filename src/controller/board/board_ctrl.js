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
    boardList : async (req, res) =>{
        const list = await service.read.boardList();
        res.render("board/boardList", renObj(req, {list : list}))
    },
    boardContent : async (req, res) =>{
        const content = await service.read.boardContent(req.query.id); //게시글
        const boardFile = await service.read.boardFile(req.query.id);   //게시글 파일
        const cmt = await service.read.cmt(req.query.id);   //댓글
        const boardReport = await service.read.boardReport(req.query.id);  //게시글 신고수
        const cmtReport = await service.read.cmtReport(req.query.id);  //댓글 신고수

        const userCookie = req.cookies.myCookie;
  
        console.log("쿠키: ", userCookie);

        if(userCookie == undefined){ //if문으로 걸러서 쿠키가 있다면? 조회수증가하지마, 없다면? 증가해
            res.cookie("myCookie", req.session.user.ID, cookieConfig); //쿠키 생성
            await service.read.upHit(req.query.id); //조회수 올리고
        }
        console.log("쿠키2: ", userCookie);

        res.render("board/boardContent", renObj(req, {content : content, file : boardFile, cmt, boardReport, cmtReport}))
    }
};

const process = {
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