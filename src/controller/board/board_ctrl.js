const service = require("../../service/board_service");
const renObj = require("../../controller/renObj");


const views = {
    boardList : (req,res) => {
        res.render("board/boardList",renObj(req,{}));
    },

    boardForm : (req,res) => {
        res.render("board/boardForm",renObj(req,{user : req.session.user}));
        console.log(renObj(req,{}));
    }
};

const process = {
    boardWrite : async (req,res) => {
        const msg = await service.BoardInsert(req.body,req.session.user);
        
        res.redirect("/board/boardList");
    },

    download : (req,res) => {
        const filePath = `/upload/${req.params.fileName}`;
        res.download(filePath);
    }
}
        


module.exports = { views, process };