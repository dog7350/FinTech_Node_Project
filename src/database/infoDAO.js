const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    updateInfo : async(id) => {
        const sql = `select * from member where id='${id}'`;
        let con = await db.getConnection(dbConfig);
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows[0];
    }
}

const process = {
    modify : async (body, pw, file) =>{
        const sql = `update member set pw='${pw}', nick='${body.nick}',profile='${file}', name='${body.name}',
        phone='${body.phone}', email='${body.email}', zipcode='${body.zipCode}', addr='${body.addr}', 
        addrDetail='${body.addrDetail}', seller='${body.seller}'
        where id='${body.id}'`;
        let con = await db.getConnection(dbConfig);
        let result =0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result;
    },
    boardList : async (id) => {
        const sql = `SELECT * FROM board WHERE writer='${id}'`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    fileList : async (bno) => {
        const sql = `SELECT * FROM boardFile WHERE bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    qnaList : async (id) => {
        const sql = `SELECT * FROM qna WHERE writer='${id}'`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    qnaFiles : async (bno) => {
        const sql = `SELECT * FROM qnaFile WHERE bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
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

module.exports = {read, process};