$(() => {
    const socket = io();
    $('#qnaChatForm').submit(() => {
        const bno = document.getElementById("chatBno").value;
        const id = document.getElementById("chatId").value;
        const profile = document.getElementById("chatProfile").value;

        let str = `${bno}|${id}|${profile}|` + $('#msg').val();
        socket.emit('qna message', str);

        const form = new FormData(document.getElementById("qnaChatForm"));
        const data = new URLSearchParams(form);
        fetch("/qna/contentChat", {
            method: "POST",
            headers: {"Content-Type" : "application/x-www-form-urlencoded"},
            body: data
        });

        $('#msg').val('');

        return false;
    });

    socket.on('qna message', (msg) => {
        if (window.location.pathname == "/qna/content") {
            const bno = document.getElementById("chatBno").value;
    
            const str = String(msg).split('|');
            const mbno = str[0];
    
            if (bno == mbno) {
                const id = document.getElementById("chatId").value;
                const writer = str[1];
                const wprofile = str[2];
                const content = str[3];
                div = ``;

                if (writer == id) {
                    div = `
                            <div id="rightContent">
                                <div>
                                    <b>${writer}</b><br>
                                    ${content}
                                </div>
                                <img src="/upload/${wprofile}">
                            </div>
                          `;
                } else {
                    div = `
                            <div id="leftContent">
                                <img src="/upload/${wprofile}">
                                <div>
                                    <b>${writer}</b><br>
                                    ${content}
                                </div>
                            </div>
                          `;
                }

                $('#qnaChatList').append(div);
                $('#qnaChatList').scrollTop($('#qnaChatList')[0].scrollHeight);
            }
        }
    });
});