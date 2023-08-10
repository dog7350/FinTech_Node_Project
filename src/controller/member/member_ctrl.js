//const service = require("../../service/member_service");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const senderInfo = require("../../../config/sender_config");

const views = {
    joinForm : (req, res) => {
        res.render("member/joinForm");
    },
    jusoPopup : (req, res) => {
        res.render("member/jusoPopup");
    }
};

const process = {
    rtnJusoPopup : (req, res) => {
        res.locals = req.body;
        res.render("member/jusoPopup");
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
            service : email,
            auth : {
                user : senderInfo.user,
                pass : senderInfo.pass
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
            from : senderInfo.user,
            to : email,
            subject : "메일 인증 코드",
            html : content
        }
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("에러! : " + error);
                return;
            } else {
                console.log("전송 완료");
            }
        });

        res.render("member/mailPopup", { email, code });
    }
};

module.exports = { views, process };