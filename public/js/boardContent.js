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
    console.log("modify : ", cno);
    const cmtContent = document.getElementById("cmtContent"+cno);
    const bno = document.getElementById("cmtBno").value;
    console.log("modify2 : ", cmtContent);
    console.log("modify2 : ", bno);
    const str = cmtContent.innerText;
    console.log("modify3 : ", str);
    cmtContent.innerHTML = 
    `<form action="/comment/modify" method="post">
        <input id="cmtBno" type="hidden" name="bno" value=${bno}>
        <input id="cmtCno" type="hidden" name="cno" value=${cno}>
        <textarea row="3" cols="50" name="cmtContent">${str}</textarea>
        <button class="btn btn-secondary">수정</button>
    </form>`;
}

cmtDelete
