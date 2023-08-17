const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    boardList : async (req, res) =>{
        const sql = `select * from board`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
            console.log("dao boardList : ", result)
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    boardContent : async (id) => {
        console.log("dao boardContent : ", id)
        const sql = `select * from board where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
            console.log("dao boardContent : ", result)
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    },
    boardFile : async (id) => {
        console.log("dao boardFile : ", id)
        const sql = `select * from boardfile where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
            console.log("dao boardFile : ", result)
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    cmt : async (id) => {
        console.log("dao cmt : ", id)
        const sql = `select * from cmt where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
            console.log("dao cmt : ", result)
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    boardReport : async (id) => {
        console.log("dao boardReport : ", id)
        const sql = `select count(*) from boardreport where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
            console.log("dao boardReport : ", result)
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    }
}

const insert = {
    
}

const remove = {

}

module.exports = { read, insert, remove };