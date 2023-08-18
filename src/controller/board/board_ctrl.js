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
        const bno = await service.maxNumber();
        // console.log(bno);
        for(let i=0; i < req.files.length; i++) {
            const result =  await service.fileName(bno,req.files[i].filename);
        }
        res.redirect("/board/boardList");
    },

    boardModifyForm : async (req,res) => {
        res.render("/board/modifyForm");
    }

}
        


module.exports = { views, process };