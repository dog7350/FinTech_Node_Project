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
    boardFileInsert : async (fileUp) => {
        const sql = await ``;
        const con = await db.getConnection(dbConfig);
        let result;

        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }
    }

}


module.exports = {daoInsert};