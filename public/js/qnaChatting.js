$(() => {
    contDiv = document.getElementById("qnaContentDiv");
    str = document.getElementById("qnaContentBtn").value;
    str = str.replaceAll("&lt;", "<");
    str = str.replaceAll("&gt;", ">");

    str = str.replaceAll("\"", "");
    str = str.replaceAll("&quot;", "");
    str = str.replaceAll("&#34;", "");
    str = str.replaceAll("le=", "le=\"");
    str = str.replaceAll(";>", ";\">");

    contDiv.innerHTML = str;

    const socket = io();
    $('#qnaChatForm').submit(() => {
        const bno = document.getElementById("qnaChatBno").value;
        const id = document.getElementById("qnaChatId").value;
        const profile = document.getElementById("qnaChatProfile").value;

        let str = `${bno}|${id}|${profile}|` + $('#qnaMsg').val();
        socket.emit('qna message', str);

        const form = new FormData(document.getElementById("qnaChatForm"));
        const data = new URLSearchParams(form);
        fetch("/qna/contentChat", {
            method: "POST",
            headers: {"Content-Type" : "application/x-www-form-urlencoded"},
            body: data
        });

        $('#qnaMsg').val('');

        return false;
    });

    socket.on('qna message', (msg) => {
        if (window.location.pathname == "/qna/content") {
            const bno = document.getElementById("qnaChatBno").value;
    
            const str = String(msg).split('|');
            const mbno = str[0];
    
            if (bno == mbno) {
                const id = document.getElementById("qnaChatId").value;
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

    socket.on('qna fileUp', (msg) => {
        myId = document.getElementById("qnaChatId").value;
        id = msg.split("|")[0];
        url = msg.split("|")[1];

        if (url == window.location.pathname + window.location.search)
            if (id != myId)
                location.reload();
        return;
    });

    document.getElementById("qnaFileSubBtn").addEventListener("change", () => {
        document.getElementById("qnaChatFileForm").submit();
        id = document.getElementById("qnaChatId").value;
        socket.emit('qna fileUp', id + "|" + window.location.pathname + window.location.search);
    });
});