const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    totalContent : async () => {
        const sql = "SELECT count(*) FROM qna";
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    list : async (start, end) => {
        sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM qna ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    content : async (bno) => {
        sql = `SELECT * FROM qna WHERE bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    files : async (bno) => {
        sql = `SELECT * FROM qnaFile WHERE bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    }
}

const insert = {
    insert : async (body) => {
        sql = "INSERT INTO qna VALUES(qna_SEQ.NEXTVAL, :title, :writer, :wprofile, SYSDATE, :content)";
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql, body);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    contentChat : async (body) => {
        sql = `INSERT INTO qna VALUES(${body.bno}, '${body.title}', '${body.id}', '${body.profile}', SYSDATE, '${body.content}')`;
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

const remove = {

}

module.exports = { read, insert, remove };