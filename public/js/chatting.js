$(() => {
    const socket = io();
    $('#ChatForm').submit(() => {
        const id = document.getElementById("chatId").value;
        const nick = document.getElementById("chatNick").value;
        const profile = document.getElementById("chatProfile").value;

        let str = window.location.pathname + window.location.search + `|${profile}|${id}|${nick}: ` + $('#msg').val();
        socket.emit('chat message', str);
        $('#msg').val('');
        return false;
    });

    socket.on('chat message', (msg) => {
        var str = String(msg).split('|');
        var site = str[0];
        var img = str[1];
        var id = str[2];
        var content = str[3];
        var nick = content.split(':')[0];
        content = content.replace(nick + ": ", "");

        var nowSite = String(window.location.pathname) + String(window.location.search);

        var li = `<li><img src='/upload/${img}' style='width:30px; height:30px;'>${nick} : ${content}</li>`;
        if(site == nowSite) { // 사이트 정제 필요
            $('#messageList').append(li);
            $('#ChatList').scrollTop($('#ChatList')[0].scrollHeight);
        }
    });
});