const board = require("../database/boardDAO");
const comment = require("../database/commentDAO");
const member = require("../database/memberDAO");
const qna = require("../database/qnaDAO");

const pageOperation = (start, totalCounter) => {
    let page = {};
    const pageNum = 15;
    const num = (totalCounter % pageNum == 0) ? 0 : 1;

    page.totPage = parseInt(totalCounter / pageNum) + num;

    page.startNum = ((start - 1) * pageNum +  1) - 1;
    page.endNum = (start * pageNum) - 1;

    return page;
}

const read = {
    searchTotalContent : async (txt, cat) => {
        const result = await member.read.searchTotalContent(txt, cat);
        return result.rows[0]['COUNT(*)'];
    },
    searchList : async (start, totalCounter, txt, cat) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await member.read.searchList(page.startNum, page.endNum, txt, cat);
        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    },
    totalContent : async () => {
        const result = await member.read.totalContent();
        return result.rows[0]['COUNT(*)'];
    },
    list : async (start, totalCounter) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await member.read.list(page.startNum, page.endNum);
        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    },
    info : async (id) => {
        const user = await member.read.login(id);
        return user;
    },
    adminBoardTotal : async (id) => {
        const result = await member.read.adminBoardTotal(id);
        return result.rows[0]['COUNT(*)'];
    },
    memberBoard : async (start, totalCounter, id) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await member.read.adminMemberBoard(page.startNum, page.endNum, id);
        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    },
    adminCmtTotal : async (id) => {
        const result = await member.read.adminCmtTotal(id);
        return result.rows[0]['COUNT(*)'];
    },
    memberCmt : async (start, totalCounter, id) => {
        start = (start && start >= 1) ? Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        const list = await member.read.adminMemberCmt(page.startNum, page.endNum, id);
        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        return data;
    }
}

const update = {
    manager : async (id, setNum) => {
        const result = await member.update.manager(id, setNum);
        return result;
    },
    stop : async (id, setNum) => {
        const result = await member.update.stop(id, setNum);
        return result;
    },
    cash : async (id, price) => {
        const result = await member.update.cash(id, price);
        return result;
    }
}

const remove = {
    exit : async (id) => {
        const result = await member.remove.exit(id);
        return result;
    }
}

module.exports = { read, update, remove, pageOperation };