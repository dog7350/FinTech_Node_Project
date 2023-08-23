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

const image = ['JPG', 'JPEG', 'PNG', 'GIF'];
const movie = ['MP4', 'AVI'];
const music = ['MP3', 'WAV'];

const openFileItemInfo = (name) => {
    ext = name.split(".")[1];

    if (image.indexOf(ext) != -1) document.getElementById("fileModalItem").innerHTML = `<img src='/upload/${name}' width="100%" height="100%">`;
    else if (movie.indexOf(ext) != -1) document.getElementById("fileModalItem").innerHTML = `<video src='/upload/${name}' width="100%" height="100%" controls></video>`;
    else if (music.indexOf(ext) != -1) document.getElementById("fileModalItem").innerHTML = `<audio controls><source src='/upload/${name}' type='audio/mpeg'></audio>`;

    $("#fileModalContainer").slideDown("slow");
    $("#fileModalBackground").show();
}

const closeFileItemInfo = () => {
    src = "";
    document.getElementById("fileModalItem").innerHTML = "";
    
    $("#fileModalContainer").slideUp("fast");
    $("#fileModalBackground").hide();
}

const deleteFileItem = () => {
    bno = document.getElementById("qnaChatBno").value;
    obj = document.getElementById("fileModalItem").children[0];
    fileName = obj.src.split("/")[obj.src.split("/").length - 1];
    location.href=`/qna/fileDelete?bno=${bno}&fileName=${fileName}`;
}

var hmcf = false;
const headerMenuControl = () => {
    if (hmcf == false) {
        hmcf = true;
        document.getElementById("qnaHeaderBtnDiv").style = "display : block";
    } else {
        hmcf = false;
        document.getElementById("qnaHeaderBtnDiv").style = "display : none";
    }
};