const dao = require("../database/memberDAO");
const bcrypt = require("bcrypt");

const read = {
    joinIdCheck : async (id) => {
        const result = await dao.read.joinIdCheck(id);

        return result;
    },
    login : async (body) => {
        const result = await dao.read.login(body.id);

        if (result == undefined) return -1;
        if (result.STOP == 1) return -9;
        if (bcrypt.compareSync(body.pw, result.PW)) {
            return result;
        } else {
            return 0;
        }
    }
}

const insert = {
    join : async (body, file) => {
        pw = bcrypt.hashSync(body.pw, 10);
        const result = await dao.insert.join(body, pw, file);
    }
}

module.exports = { read, insert };