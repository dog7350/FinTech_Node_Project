const dao = require("../database/qnaDAO");

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
    totalContent : async () => {
        const result = await dao.read.totalContent();
        console.log("start : ", result)
        return result.rows[0]['COUNT(*)'];
    },
    list : async (start, totalCounter) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await dao.read.list(page.startNum, page.endNum);
        data = {};

        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    },
    content : async (bno) => {
        const result = await dao.read.content(bno);
        return result;
    },
    files : async (bno) => {
        const result = await dao.read.files(bno);
        return result;
    }
}

const insert = {
    insert : async (body) => {
        const result = dao.insert.insert(body);
        return result;
    },
    contentChat : async (body) => {
        const result = dao.insert.contentChat(body);
        return result;
    }
}

const remove = {

}

module.exports = { read, insert, remove };