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
    `<form action="/comment/modify" method="post">
        <input id="cmtBno" type="hidden" name="bno" value=${bno}>
        <input id="cmtCno" type="hidden" name="cno" value=${cno}>
        <textarea row="3" cols="50" name="cmtContent">${str}</textarea>
        <button class="btn btn-secondary">수정</button>
        <input type="button" class="btn btn-danger" onclick="location.reload();" value="취소">
    </form>`;
    
    document.getElementsByClassName("cmtListBtn")[0].style.display = "none";

}

const openFileInfo = (name) => {
    document.getElementById("fileModalItem").innerHTML = `<img src='/upload/${name}' width="100%" height="100%">`;
    $("#fileModalContainer").slideDown("slow");
    $("#fileModalBackground").show();
}

const closeFileItemInfo = () => {
    src = "";
    document.getElementById("fileModalItem").innerHTML = "";
    
    $("#fileModalContainer").slideUp("fast");
    $("#fileModalBackground").hide();
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
