const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    boardList : async (req, res) =>{
        const sql = `select * from board`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    boardContent : async (id) => {
        const sql = `select * from board where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    },
    boardFile : async (id) => {
        const sql = `select * from boardfile where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    cmt : async (id) => {
        const sql = `select * from cmt where bno = ${id} order by cno desc`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows;
    },
    boardReport : async (id) => {
        const sql = `select count(*) from boardreport where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    },
    cmtReport : async (id) => {
        const sql = `select count(*) from cmtreport where bno = ${id}`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
        return result.rows[0];
    }
}

const insert = {
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

const daoUpdate = {
    upHit : async (bno) => {
        const con = await db.getConnection(dbConfig);
        const sql =`update board set INQUIRY = INQUIRY+1 where bno='${bno}'`;
        await con.execute(sql);
        
    }
}

module.exports = { read, insert, remove, daoUpdate };