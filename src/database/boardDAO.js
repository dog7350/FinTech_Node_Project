const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const daoInsert = {
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
        // console.log(result.rows[0]["MAX(BNO)"]);

        return result.rows[0]["MAX(BNO)"];
    }

}


module.exports = {daoInsert};