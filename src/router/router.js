module.exports = (app) => {
    const router = require("express").Router();

    // 테스트
    router.get("/", (req, res) => {
        res.render("index");
    });

    return router;
}