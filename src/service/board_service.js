const dao = require("../database/boardDAO");

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
    totalContent : async (category) => {
        const result = await dao.read.totalContent(category);
        console.log("서비스 리스트: ", result);
        //return result.rows[0]['COUNT(*)'];
        return result.rows;
    },
    list : async (start, totalCounter) => {
        start = (start && start >= 1) ? Number(start) : 1;
        console.log("start : ", start);
        const page = pageOperation(start, totalCounter);

        const list = await dao.read.list(page.startNum, page.endNum);
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