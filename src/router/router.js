module.exports = (app) => {
    const admin = require("./sub/admin_router");
    app.use("/admin", admin);
    const board = require("./sub/board_router");
    app.use("/board", board);
    const comment = require("./sub/comment_router");
    app.use("/comment", comment);
    const member = require("./sub/member_router");
    app.use("/member", member);
    const qna = require("./sub/qna_router");
    app.use("/qna", qna);
    const info = require("./sub/info_router");
    app.use("/info", info);

    const router = require("express").Router();

    // 메인 페이지
    router.get("/", board);

    return router;
}