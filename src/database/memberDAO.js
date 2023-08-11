const db = require("./db_object");
const dbConfig = require("../../config/db_config");

const read = {
    joinIdCheck : async (id) => {
        const sql = `SELECT * FROM member WHERE id='${id}'`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }

        return result.rows[0];
    },
    login : async (id) => {
        const sql = `SELECT * FROM member WHERE id='${id}'`;
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
    join : async (body, pw, file) => {
        const sql = `INSERT INTO member VALUES('${body.id}', '${pw}', '${body.nick}', '${file}', '${body.name}', '${body.phone}', '${body.email}', 
                    '${body.zipCode}', '${body.addr}', '${body.addrDetail}', '${body.seller}', 0, 0, 0)`;
        const con = await db.getConnection(dbConfig);

        let result = 0;
        try {
            result = await con.execute(sql);
        } catch (e) {
            console.log(e);
        }

        return result;
    }
}

module.exports = { read, insert };