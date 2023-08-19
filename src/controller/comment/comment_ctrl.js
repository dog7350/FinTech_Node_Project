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
        //const loginId = req.cookies.myCookie;
        let cno = await service.read.cno(req.body.bno);
        console.log("ctrl", cno)
        const cno2 = (cno == undefined) ? 1 : cno+=1;
        console.log("ctrl2", cno2)
        console.log("req.body", req.body)
        const result = await service.insert.register(req.body, cno2);
        console.log("ctrl3", result)
        if(result == 1 ){
            res.send(rtnMsg("댓글이 등록 되었습니다", "/board/boardContent?id="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글이 등록 실패입니다", "/board/boardContent?id='${req.body.bno}'"));
        }
        
    },
    modify : async (req, res) => {
        console.log("ctrl", req.body);
        const result = await service.update.modify(req.body);
        console.log("ctrl3", req.body);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 수정 되었습니다", "/board/boardContent?id="+req.body.bno));
        }else{
            res.send(rtnMsg("댓글 등록 실패입니다", "/board/boardContent?id='${req.body.bno}'"));
        }
    },
    delete : async (req, res) => {
        console.log("ctrl", req.query);
        const result = await service.remove.delete(req.query);
        if(result == 1 ){
            res.send(rtnMsg("댓글이 삭제 되었습니다", "/board/boardContent?id="+req.query.bno));
        }else{
            res.send(rtnMsg("댓글 삭제 실패입니다", "/board/boardContent?id='${req.query.bno}'"));
        }
    }
};

module.exports = { views, process };