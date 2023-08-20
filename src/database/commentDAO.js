const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    cno : async (bno) =>  {
        const sql = `select max(cno) from cmt where bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        
        let result = 0;
        try{
            result = await con.execute(sql);
            console.log(result);
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
            console.log(result);
        }catch (e) {
            console.log(e);
        }
        return result;
    }
}

const insert = {
    register : async (body, id, cno, file) => {
        console.log("dao123", body, cno)
        const sql = `INSERT INTO cmt VALUES('${body.bno}','${cno}', '${id}', '${file}', '${body.content}', SYSDATE)`;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql);
            console.log("dao", result)
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

const remove = {
    delete : async (query) => {
        console.log("dao delete", query)
        const sql = `delete from cmt where bno=:bno and cno=:cno`;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql, query);
            console.log("dao", result)
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

const update = {
    modify : async (body) => {
        console.log("dao modify", body)
        const sql = `update cmt set content=:cmtContent where bno=:bno and cno=:cno`;
        const con = await db.getConnection(dbConfig);
        let result = 0;

        try {
            result = await con.execute(sql, body);
            console.log("dao", result)
            result = 1;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

module.exports = { read, insert, remove, update };