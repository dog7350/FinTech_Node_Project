const service = require("../../service/comment_service");

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

};

const process = {
    register : async (req, res) =>{
        let cno = await service.read.cno(req.body.bno);
        console.log("ctrl", cno)
        const cno2 = (cno == undefined) ? 1 : cno+=1;
        console.log("ctrl2", cno2)
        console.log("req.body", req.body)
        console.log("req.body", req.session.user)
        console.log("req.body 123", req.session.user.ID)
        const result = await service.insert.register(req.body, req.session.user.ID, cno2);
        console.log("ctrl3", result)
        if(result == 1 ){
            res.send(rtnMsg("댓글이 등록 되었습니다", "/board/boardContent?id="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글이 등록 실패입니다", "/board/boardContent?id="+req.body.bno));
        }
        
    },
    modify : async (req, res) => {
        console.log("ctrl", req.body);
        const result = await service.update.modify(req.body);
        console.log("ctrl3", req.body);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 수정 되었습니다", "/board/boardContent?id="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글 등록 실패입니다", "/board/boardContent?id="+req.body.bno));
        }
    },
    delete : async (req, res) => {
        console.log("ctrl", req.query);
        const result = await service.remove.delete(req.query);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 삭제 되었습니다", "/board/boardContent?id="+req.query.bno));
        }else{
            res.send(rtnMsg("댓글 삭제 실패입니다", "/board/boardContent?id="+req.query.bno));
        }
    },
    report : async (req, res) => {
        console.log("cmt report", req.session.user)
        console.log("cmt report", req.session.user.ID)
        const result = await service.insert.report(req.body, req.session.user.ID);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 신고 되었습니다.", "/board/boardContent?id="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글을 이미 신고 하셨습니다.", "/board/boardContent?id="+req.body.bno));
        }
    }
};

module.exports = { views, process };