const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    mainBoard : async () => {
        var sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE category != 'notice' ORDER BY bno DESC) A) B WHERE rn BETWEEN 1 AND 50`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    mainSell : async () => {
        var sql = sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE category='sell' ORDER BY bno DESC) A) B WHERE rn BETWEEN 1 AND 6`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    mainStar : async () => {
        var sql = sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board ORDER BY inquiry DESC) A) B WHERE rn BETWEEN 1 AND 10`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    searchTotalContent : async (txt, cat) => {
        var sql = `SELECT count(*) FROM board WHERE ${cat} LIKE '%${txt}%'`;

        const con = await db.getConnection(dbConfig);
        result = 0;
        try{
            result = await con.execute(sql);
        }catch(e){
            console.log(err);
        }
        return result;
    },
    searchList : async (start, end, txt, cat) => {
        var sql = sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE ${cat} LIKE '%${txt}%' ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    boardContent : async (bno) => {
        const sql = `select * from board where bno = ${bno}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    },
    boardFile : async (bno) => {
        const sql = `select * from boardfile where bno = ${bno}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    cmt : async (bno) => {
        const sql = `select * from cmt where bno = ${bno} order by cno desc`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    boardReport : async (bno) => {
        const sql = `select count(*) from boardreport where bno = ${bno}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    },
    cmtReport : async (bno) => {
        const sql = `select count(*) from cmtreport where bno = ${bno}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    },
   totalContent : async (category) => {
        var sql = ``;
        if (category == "all") sql = `SELECT count(*) FROM board`;
        else sql = `SELECT count(*) FROM board WHERE category='${category}'`;

        const con = await db.getConnection(dbConfig);
        result = 0;
        try{
            result = await con.execute(sql);
            console.log("리스트: ", result);
        }catch(e){
            console.log(err);
        }
        return result;
    },
    list : async (start, end, category) => {
        var sql = ``;
        if (category == "all") sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE category != 'notice' ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        else sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE category='${category}' ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    noticeList : async () => {
        var sql = sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE category='notice' ORDER BY bno DESC) A) B WHERE rn BETWEEN 1 AND 5`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

const insert = {
    boardContentInsert : async (body, member) => {
        const sql = await `INSERT INTO board values(board_SEQ.NEXTVAL,'${body.category}','${body.title}','${member.ID}','${member.PROFILE}','${body.content}',sysdate,0)`;
        const con = await db.getConnection(dbConfig);
        
        let result;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e)
        }
    },
    fileNameInsert : async (num,fileName) => {
        const sql = await `INSERT INTO boardFile values('${num}','${fileName}')`;
        const con = await db.getConnection(dbConfig);
        let result;

        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e)
        }
    },
    boardNumber : async () => {
        const sql = await `SELECT max(bno) from board`;
        const con = await db.getConnection(dbConfig);
        let result;
        
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);        
        }

        return result.rows[0]["MAX(BNO)"];
    },
    report : async (bno, id) => {
        const sql = `insert into boardreport values('${bno}', '${id}') `;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql);
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

const remove = {

}

const update = {
    upHit : async (bno) => {
        const con = await db.getConnection(dbConfig);
        const sql =`update board set INQUIRY = INQUIRY+1 where bno='${bno}'`;
        await con.execute(sql);
    }
}

module.exports = { read, insert, update };