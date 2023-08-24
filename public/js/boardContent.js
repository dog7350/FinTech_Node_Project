function MouseEvent(fileName){
    const container = document.getElementById(fileName);
    if(container.style.width == "100px"){
        container.style.width = "40px";
        container.style.height = "40px";
    }else{
    container.style.width = "100px";
    container.style.height = "100px";
    }
}

function cmtModify(cno){
    const cmtContent = document.getElementById("cmtContent"+cno);
    const bno = document.getElementById("cmtBno").value;
    const str = cmtContent.innerText;
    cmtContent.innerHTML = 
    `<form action="/comment/modify" method="post" style="display: flex;">
        <input id="cmtBno" type="hidden" name="bno" value=${bno}>
        <input id="cmtCno" type="hidden" name="cno" value=${cno}>
        <textarea name="cmtContent" row="3" style="width: 100%; resize: none;">${str}</textarea>
        <div>
            <button class="btn btn-secondary">수정</button><br>
            <input type="button" class="btn btn-danger" onclick="location.reload();" value="취소">
        </div>
    </form>`;
    
    document.getElementsByClassName("cmtListBtn")[0].style.display = "none";

}
const playTimeCheck = () => {
    mp3 = document.getElementById("audioDown");
    if (mp3.currentTime >= (mp3.duration * 0.3)) {
        mp3.currentTime = 0;
        mp3.pause();
    }
    runPlayTime();
}
const runPlayTime = () => {
    setTimeout(playTimeCheck, 1000);
}

const image = ['JPG', 'JPEG', 'PNG', 'GIF'];
const movie = ['MP4', 'AVI'];
const music = ['MP3', 'WAV'];

const openFileInfo = (name, type) => {
    audioId = 'noDown';
    if (type == "download") {
        document.getElementById("downFile").style = "visibility : visible";
        audioId = 'audioDown';
    }
    else if (type == "none") document.getElementById("downFile").style = "visibility : hidden";

    ext = name.split(".")[1];

    if (image.indexOf(ext) != -1) document.getElementById("fileModalItem").innerHTML = `<img id="modalFile" src='/upload/${name}' width="100%" height="100%">`;
    else if (movie.indexOf(ext) != -1) document.getElementById("fileModalItem").innerHTML = `<video id="modalFile" src='/upload/${name}' width="100%" height="100%" controls></video>`;
    else if (music.indexOf(ext) != -1) document.getElementById("fileModalItem").innerHTML = `<audio id="${audioId}" onplay="playTimeCheck()" controls controlsList="nodownload">
                                                                                                <source id="modalFile" src='/upload/${name}' type='audio/mpeg'>
                                                                                             </audio>`;

    $("#fileModalContainer").slideDown("slow");
    $("#fileModalBackground").show();
}
const closeFileItemInfo = () => {
    src = "";
    document.getElementById("fileModalItem").innerHTML = "";
    
    $("#fileModalContainer").slideUp("fast");
    $("#fileModalBackground").hide();
}
const buyItemFile = () => {
    question = confirm("구매하시겠습니까?");
    price = document.getElementById("productPrice").value;
    file = document.getElementById("modalFile").src.split("/");
    file = file[file.length - 1];
    if (question) {
        location.href=`/admin/buyItem?price=${price}&file=${file}`;
    } else {
        alert("취소되었습니다.");
    }
}

var hmcf = false;
const headerMenuControl = () => {
    if (hmcf == false) {
        hmcf = true;
        document.getElementById("boardContentHeaderBtnDiv").style = "display : block";
    } else {
        hmcf = false;
        document.getElementById("boardContentHeaderBtnDiv").style = "display : none";
    }
}

onload = () => {
    contentDiv = document.getElementById("boardContent");
    str = document.getElementById("boardContentTmp").value;
    str = str.replaceAll("&lt;", "<");
    str = str.replaceAll("&gt;", ">");

    str = str.replaceAll("\"", "");
    str = str.replaceAll("&quot;", "");
    str = str.replaceAll("&#34;", "");
    str = str.replaceAll("le=", "le=\"");
    str = str.replaceAll(";>", ";\">");
    contentDiv.innerHTML = str;
}
