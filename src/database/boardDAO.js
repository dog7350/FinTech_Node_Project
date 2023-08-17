const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
   totalContent : async (category) => {
        var sql = ``;
        if (category == "all") sql = `SELECT rownum rn, A.* FROM(SELECT * FROM board ORDER BY bno DESC) A`;
        else sql = `SELECT rownum rn, A.* FROM(SELECT * FROM board ORDER BY bno DESC) A WHERE category='${category}'`;

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
    list : async (start, end) => {
        sql = `SELECT B.* FROM (SELECT rownum rn, A.* FROM(SELECT * FROM board ORDER BY bno DESC) A) B WHERE rn BETWEEN ${start} AND ${end}`;
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
    
}

const remove = {

}

module.exports = { read, insert, remove };