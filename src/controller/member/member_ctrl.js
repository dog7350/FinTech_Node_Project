const service = require("../../service/member_service");
const fs = require("fs");
const renObj = require("../renObj");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const senderInfo = require("../../../config/sender_config");

/*
const ses = new aws.SES({
    apiVersion: "2012-10-17",
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: senderInfo.config.accessKeyId,
        secretAccessKey: senderInfo.config.secretAccessKey
    },
    defaultProvider
});
*/

const views = {
    joinForm : (req, res) => {
        res.render("member/joinForm", renObj(req, {}));
    },
    jusoPopup : (req, res) => {
        res.render("member/jusoPopup", renObj(req, { layout : false }));
    }
};

const process = {
    joinIdCheck : async (req, res) => {
        const result = await service.read.joinIdCheck(req.query.id);
        let rid = undefined;
        if (result != undefined) rid = result.ID;

        res.render("member/joinIdPopup", renObj(req, { id : req.query.id, rid, layout : false }));
    },
    rtnJusoPopup : (req, res) => {
        res.locals = req.body;
        res.render("member/jusoPopup", renObj(req, { layout : false }));
    },
    mailAuth : (req, res) => {
        const code = crypto.randomBytes(5).toString("hex");
        const email = req.query.email;
        const timeLimit = "1분";
        const content = `
                            <p>환영합니다.</p>
                            <p>해당 메일은 입력하신 ${email}이 정확한 메일인지 확인하는 메일입니다.</p>
                            <p>이메일 인증 코드는 ${code} 입니다.</p>
                            <p>해당 코드는 ${timeLimit} 후 만료됩니다.</p>
                        `;

        var transport = nodemailer.createTransport({
            // SES : { ses, aws } > Linux
            service : email,
            auth : {
                user : senderInfo.user.user,
                pass : senderInfo.user.pass
            },
            port : 587,
            host : 'smtp.gmail.com',
            secure : false,
            requireTLS : true,
            tls : {
                rejectUnauthorize : false
            },
            maxConnections : 5,
            maxMessages : 10
        });
        var mailOptions = {
            from : senderInfo.user.user,
            to : email,
            subject : "메일 인증 코드",
            html : content,
            /*
            ses : { // ses append
                Tags : [
                    {
                        Name : "FNTC",
                        Value : "EmailAuth"
                    }
                ]
            }
            */
        }
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("에러! : " + error);
                return;
            } else {
                console.log("Send!");
            }
        });

        res.render("member/mailPopup", renObj(req, { email, code, layout : false }));
    },
    join : async (req, res) => {
        let file = "";
        if (req.file == undefined) file = "DefaultProfile.gif";
        else file = req.file.filename;

        const result = await service.insert.join(req.body, file);

        res.redirect("/");
    },
    login : async (req, res) => {
        const result = await service.read.login(req.body);

        if (result == -1) res.send(`<script>alert("아이디가 존재하지 않습니다."); history.back();</script>`);
        else if (result == 0) res.send(`<script>alert("비밀번호가 올바르지 않습니다."); history.back();</script>`);
        else {
            req.session.user = result;
            res.send(`<script>alert("환영합니다. ${result.ID} 님!"); location.href='/';</script>`);
        }
    },
    logout : (req, res) => {
        req.session.destroy();
        res.send(`<script>alert("로그아웃 되셨습니다."); location.href='/';</script>`);
    }
};

module.exports = { views, process };