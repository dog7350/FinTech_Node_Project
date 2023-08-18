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
    boardContent : async (bno) => {
        console.log("ser boardContent : ", bno)
        const result = await dao.read.boardContent(bno);
        console.log("ser boardContent : ", result)
        return result;
    },
    boardFile : async (bno) => {
        console.log("ser boardFile : ", bno)
        const result = await dao.read.boardFile(bno);
        console.log("ser boardFile : ", result)
        return result;
    },
    cmt : async (bno) => {
        console.log("ser cmt : ", bno)
        const result = await dao.read.cmt(bno);
        console.log("ser cmt : ", result)
        return result;
    },
    boardReport : async (bno) => {
        const result = await dao.read.boardReport(bno);
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
    },
    maxNumber : async () => {
        const result = await dao.insert.boardNumber();
       
        return result;
    }
}
const insert = {
    BoardInsert : async (body,member) => {
        const result = await dao.insert.boardContentInsert(body,member);
    },
    fileName : async (num,fileName) => {
        const result = await dao.insert.fileNameInsert(num,fileName);
    }
}

const remove = {

}

const pageUpdate = {
    upHit : async (bno) => {
        await dao.update.upHit(bno);
    }
}

module.exports = { read, insert, remove };