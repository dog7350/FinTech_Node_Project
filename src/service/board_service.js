const dao = require("../database/boardDAO");

const BoardInsert = async (body,member) => {
    const result = await dao.daoInsert.boardContentInsert(body,member);
}



module.exports = {BoardInsert};