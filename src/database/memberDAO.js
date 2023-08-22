const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    searchTotalContent : async (txt, cat) => {
        var sql = `SELECT count(*) FROM member WHERE ${cat} LIKE '%${txt}%'`;

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
        var sql = sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM member WHERE ${cat} LIKE '%${txt}%' ORDER BY id DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    totalContent : async () => {
        var sql = `SELECT count(*) FROM member`;

        const con = await db.getConnection(dbConfig);
        result = 0;
        try{
            result = await con.execute(sql);
        }catch(e){
            console.log(err);
        }
        return result;
    },
    list : async (start, end) => {
        var sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM member ORDER BY id DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    joinIdCheck : async (id) => {
        const sql = `SELECT * FROM member WHERE id='${id}'`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }

        return result.rows[0];
    },
    login : async (id) => {
        const sql = `SELECT * FROM member WHERE id='${id}'`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }

        return result.rows[0];
    },
    adminBoardTotal : async (id) => {
        var sql = `SELECT count(*) FROM board WHERE writer='${id}'`;

        const con = await db.getConnection(dbConfig);
        result = 0;
        try{
            result = await con.execute(sql);
        }catch(e){
            console.log(err);
        }
        return result;
    },
    adminMemberBoard : async (start, end, id) => {
        var sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE writer='${id}' ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    adminCmtTotal : async (id) => {
        var sql = `SELECT count(*) FROM cmt WHERE writer='${id}'`;

        const con = await db.getConnection(dbConfig);
        result = 0;
        try{
            result = await con.execute(sql);
        }catch(e){
            console.log(err);
        }
        return result;
    },
    adminMemberCmt : async (start, end, id) => {
        var sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM cmt WHERE writer='${id}' ORDER BY bno, cno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
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
    join : async (body, pw, file) => {
        const sql = `INSERT INTO member VALUES('${body.id}', '${pw}', '${body.nick}', '${file}', '${body.name}', '${body.phone}', '${body.email}', 
                    '${body.zipCode}', '${body.addr}', '${body.addrDetail}', '${body.seller}', 0, 0, 0)`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }

        return result;
    }
}

const update = {
    manager : async (id, setNum) => {
        const sql = `UPDATE member SET admin=${setNum} WHERE id='${id}'`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    stop : async (id, setNum) => {
        const sql = `UPDATE member SET stop=${setNum} WHERE id='${id}'`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    cash : async (id, price) => {
        const sql = `UPDATE member SET cash=${price} WHERE id='${id}'`;
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
    exit : async (id) => {
        const sql = `DELETE FROM member WHERE id='${id}'`;
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

module.exports = { read, insert, update, remove };