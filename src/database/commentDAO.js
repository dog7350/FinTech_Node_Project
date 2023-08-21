const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    cno : async (bno) =>  {
        const sql = `select max(cno) from cmt where bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch (e) {
            console.log(e);
        }
        return result;
    },
    cmtFile : async (writer) => {
        const sql = `select profile from member where id='${writer}'`;
        const con = await db.getConnection(dbConfig);
        
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch (e) {
            console.log(e);
        }
        return result;
    }
}

const insert = {
    register : async (body, id, cno, file) => {
        const sql = `INSERT INTO cmt VALUES('${body.bno}','${cno}', '${id}', '${file}', '${body.content}', SYSDATE)`;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql);
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    },
    report : async (body, id) => {
        const sql = `insert into cmtreport values('${body.bno}', '${body.cno}', '${id}') `;
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
    delete : async (query) => {
        const sql = `delete from cmt where bno=:bno and cno=:cno`;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql, query);
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

const update = {
    modify : async (body) => {
        const sql = `update cmt set content=:cmtContent where bno=:bno and cno=:cno`;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql, body);
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

module.exports = { read, insert, remove, update };