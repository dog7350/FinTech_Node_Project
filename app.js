const express = require("express");
const layout = require("express-ejs-layouts");
const session = require("express-session");
const sessionConfig = require("./config/session_config");
const cookieParser = require("cookie-parser");
const app = express();

// POST Parser 등록
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( { extended : true } ));
app.use(bodyParser.json());

// Session 및 Cookie 등록
app.use(session( sessionConfig.sessionConfig ));
app.use(cookieParser("CooKey"));

// 공통 사용 파일 경로 등록
app.use("/public", express.static(__dirname + "/public"));
app.use("/upload", express.static(__dirname + "/upload"));
app.use(layout);

// 최상위 라우터 등록
const router = require("./src/router/router")(app);
app.use("/", router);

// 사용될 View 형태 등록
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.set("layout", __dirname + "/src/views/layout/layout");

app.listen(3000, () => { console.log("Server Starting...") } );