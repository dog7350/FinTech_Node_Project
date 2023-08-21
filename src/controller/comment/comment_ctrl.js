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
        const cno2 = (cno == undefined) ? 1 : cno+=1;
        const result = await service.insert.register(req.body, req.session.user.ID, cno2);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 등록 되었습니다", "/board/boardContent?bno="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글이 등록 실패입니다", "/board/boardContent?bno="+req.body.bno));
        }
        
    },
    modify : async (req, res) => {
        const result = await service.update.modify(req.body);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 수정 되었습니다", "/board/boardContent?bno="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글 등록 실패입니다", "/board/boardContent?bno="+req.body.bno));
        }
    },
    delete : async (req, res) => {
        const result = await service.remove.delete(req.query);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 삭제 되었습니다", "/board/boardContent?bno="+req.query.bno));
        }else{
            res.send(rtnMsg("댓글 삭제 실패입니다", "/board/boardContent?bno="+req.query.bno));
        }
    },
    report : async (req, res) => {
        const result = await service.insert.report(req.body, req.session.user.ID);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 신고 되었습니다.", "/board/boardContent?bno="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글을 이미 신고 하셨습니다.", "/board/boardContent?bno="+req.body.bno));
        }
    }
};

module.exports = { views, process };