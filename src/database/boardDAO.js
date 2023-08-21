const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
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
        
        const sql = `select * from cmt where bno = ${bno}`;
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
   totalContent : async (category) => {
        
        var sql = ``;
        if (category == "all") sql = `SELECT count(*) FROM board`;
        else sql = `SELECT count(*) FROM board WHERE category='${category}'`;

        const con = await db.getConnection(dbConfig);
        result = 0;
        try{
            result = await con.execute(sql);
            
        }catch(e){
            console.log(e);
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
    boardContentInsert : async (body, member,thumfile) => {
    
        const sql = await `INSERT INTO board values(board_SEQ.NEXTVAL,'${body.category}','${body.title}','${member.ID}','${member.PROFILE}','${thumfile}','${body.content}',sysdate,0)`;
            
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
    boardFileDel : async (bno) => {
        const sql = `DELETE FROM boardfile WHERE bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        let result;

        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e)
        }
        
        return result;
    },

    boardDel : async (bno) => {
        const sql = `DELETE FROM board WHERE bno=${bno}`;
        const con = await db.getConnection(dbConfig);
        let result;

        try {
            result = await con.execute(sql)
        } catch (e) {
            console.log(e)
        }
        return result;
    }
}

const update = {
    upHit : async (bno) => {
        const con = await db.getConnection(dbConfig);
        const sql =`update board set INQUIRY = INQUIRY+1 where bno='${bno}'`;
        await con.execute(sql);
    },

    boardModify : async (body) => {
        const sql = `UPDATE board SET category='${body.category}' ,title='${body.title}', content='${body.content}', time=sysdate WHERE bno=${body.bno}`;
        const con = await db.getConnection(dbConfig);
        let result;

        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e)
        }
        
        return result;

    }
    
}


module.exports = { read, insert, update, remove };