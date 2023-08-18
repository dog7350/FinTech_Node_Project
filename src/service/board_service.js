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

    content : async (bno) => {
        pageUpdate.upHit(bno);
        const data = await dao.read.content(bno);
        return data.rows[0];
    }
}

const insert = {
    
}

const remove = {

}

const pageUpdate = {
    upHit : (bno) => {
        dao.daoUpdate.upHit(bno);
    }
}


module.exports = { read, insert, remove,pageUpdate };