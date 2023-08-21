const board = require("../database/boardDAO");
const comment = require("../database/commentDAO");
const member = require("../database/memberDAO");
const qna = require("../database/qnaDAO");

const pageOperation = (start, totalCounter) => {
    let page = {};
    const pageNum = 15;
    const num = (totalCounter % pageNum == 0) ? 0 : 1;

    page.totPage = parseInt(totalCounter / pageNum) + num;

    page.startNum = (start - 1) * pageNum +  1;
    page.endNum = start * pageNum;

    return page;
}

const read = {
    list : async (start, totalCounter) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await dao.read.list(page.startNum, page.endNum, category);
        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    }
}

const insert = {
    
}

const remove = {

}

module.exports = { read, insert, remove };