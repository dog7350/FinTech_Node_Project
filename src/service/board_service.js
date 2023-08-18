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
    boardContent : async (id) => {
        console.log("ser boardContent : ", id)
        const result = await dao.read.boardContent(id);
        console.log("ser boardContent : ", result)
        return result;
    },
    boardFile : async (id) => {
        console.log("ser boardFile : ", id)
        const result = await dao.read.boardFile(id);
        console.log("ser boardFile : ", result)
        return result;
    },
    cmt : async (id) => {
        console.log("ser cmt : ", id)
        const result = await dao.read.cmt(id);
        console.log("ser cmt : ", result)
        return result;
    },
    boardReport : async (id) => {
        const result = await dao.read.boardReport(id);
        return result['COUNT(*)'];
    },
    upHit : async (bno) => {
        pageUpdate.upHit(bno);
    },
    totalContent : async (category) => {
        console.log(category);
        const result = await dao.read.totalContent(category);
        console.log("서비스 리스트: ", result);
        console.log("으악:", result.rows[0]['COUNT(*)']);  //언디파인
        return result.rows[0]['COUNT(*)'];
        //return result.rows;
    },
    list : async (start, totalCounter, category) => {
        start = (start && start >= 1) ? Number(start) : 1;
        console.log("start : ", start); //1
        const page = pageOperation(start, totalCounter);

        const list = await dao.read.list(page.startNum, page.endNum, category);
        data = {};
        console.log("!23", page)
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

const pageUpdate = {
    upHit : async (bno) => {
        await dao.daoUpdate.upHit(bno);
    }
}

module.exports = { read, insert, remove};