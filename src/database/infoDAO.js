const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    updateInfo : async(id) => {
        const sql = `select * from member where id='${id}'`;
        let con = await db.getConnection(dbConfig);
        let result = 0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result.rows[0];
    }
}

const process = {
    modify : async (body, pw, file) =>{
        const sql = `update member set pw='${pw}', nick='${body.nick}',profile='${file}', name='${body.name}',
        phone='${body.phone}', email='${body.email}', zipcode='${body.zipCode}', addr='${body.addr}', 
        addrDetail='${body.addrDetail}', seller='${body.seller}'
        where id='${body.id}'`;
        let con = await db.getConnection(dbConfig);
        let result =0;
        try{
            result = await con.execute(sql);
        }catch(err){
            console.log(err);
        }
        return result;
    } 
}

module.exports = {read, process};