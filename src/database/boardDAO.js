const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
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
    },

    content : async(bno)=>{
        const con = await db.getConnection(dbConfig);
        const sql = `select * from baord where bno='${bno}'`;
        const data = await con.execute(sql);
        return data;
    }
}

const insert = {
    
}

const remove = {

}

const daoUpdate = {
    upHit : async(bno) => {
        const con = await db.getConnection(dbConfig);
        const sql =`update board set INQUIRY = INQUIRY+1 where bno='${bno}'`;
    await con.execute(sql);
    }
}

module.exports = { read, insert, remove, daoUpdate };