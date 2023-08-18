const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
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
    },
   totalContent : async (category) => {
        console.log(category);
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
        if (category == "all") sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
        else sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board WHERE category='${category}' ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
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