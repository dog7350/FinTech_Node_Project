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
    main : async () => {
        data = {};
        data.list = await dao.read.mainBoard();
        data.notice = await dao.read.noticeList();
        data.sell = await dao.read.mainSell();
        data.star = await dao.read.mainStar();

        return data;
    },
    searchTotalContent : async (txt, cat) => {
        const result = await dao.read.searchTotalContent(txt, cat);
        return result.rows[0]['COUNT(*)'];
    },
    searchList : async (start, totalCounter, txt, cat) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await dao.read.searchList(page.startNum, page.endNum, txt, cat);
        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    },
    boardContent : async (bno) => {
        const result = await dao.read.boardContent(bno);
        return result;
    },
    boardFile : async (bno) => {
        const result = await dao.read.boardFile(bno);
        return result;
    },
    cmt : async (bno) => {
        const result = await dao.read.cmt(bno);
        return result;
    },
    boardReport : async (bno) => {
        const result = await dao.read.boardReport(bno);
        return result['COUNT(*)'];
    },
    cmtReport : async (bno) => {
        const result = await dao.read.cmtReport(bno);
        return result;
    },
    upHit : async (bno) => {
        pageUpdate.upHit(bno);
    },
    totalContent : async (category) => {
        const result = await dao.read.totalContent(category);
        return result.rows[0]['COUNT(*)'];
    },
    list : async (start, totalCounter, category) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await dao.read.list(page.startNum, page.endNum, category);
        data = {};
        
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    },
    noticeList : async () => {
        notice = await dao.read.noticeList();
        return notice.rows;
    },
    maxNumber : async () => {
        const result = await dao.insert.boardNumber();
       
        return result;
    }
}

const insert = {
    BoardInsert : async (body,member,thumfile) => {
        const result = await dao.insert.boardContentInsert(body,member,thumfile);
    },
    fileName : async (num,fileName) => {
        const result = await dao.insert.fileNameInsert(num,fileName);
    },
    report : async (bno, id) => {
        const result = await dao.insert.report(bno, id);
        return result;
    }
}

const update = {
    boardUpdate : async (body,upfile) => {
        const result = await dao.update.boardModify(body,upfile);
    }
}


const remove = {
    boardFileDel : async (bno) => {
        const result = await dao.remove.boardFileDel(bno);
    },
    boardDele : async (bno) => {
        const result = await dao.remove.boardDel(bno);
    }
}

const pageUpdate = {
    upHit : async (bno) => {
        await dao.update.upHit(bno);
    }
}

module.exports = { read, insert, remove, update };