const service = require("../../service/board_service");
const renObj = require("../renObj");

const views = {
    list : async (req,res) => {
        const totalContent = await service.read.totalContent(req.query.category);
        //console.log("totalContent:",totalContent);
        //console.log("랭뚜: ", totalContent.length); //3
        console.log("req.query.start:",req.query.start);
        const data = await service.read.list(req.query.start, totalContent.length);
        
        console.log("컨트롤러", totalContent);
        console.log(data.list);
        res.render("board/boardList", renObj(req,{list:totalContent, start:data.start, page:data.page}));
    }
};

const process = {

};

module.exports = { views, process };