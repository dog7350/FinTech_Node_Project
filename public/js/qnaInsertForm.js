let oEditors = []

createEditor = () => {
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "contentTxt",
        sSkinURI: "/smart/SmartEditor2Skin.html",
        htParams: {
            bUseVerticalResizer : false,
            bUseModeChanger : false
        },
        fCreator: "createSEditor2"
    });
}

submitForm = () => {
    oEditors.getById["contentTxt"].exec("UPDATE_CONTENTS_FIELD", []);
    let title = document.getElementById("titleTxt").value;
    let content = document.getElementById("contentTxt").value;

    if (title == "") {
        alert("제목을 입력하세요.");
        return;
    } else if(content == "<p>&nbsp;</p>") {
        alert("내용을 입력하세요.");
        oEditors.getById["contentTxt"].exec("FOCUS");
        return;
    } else {
        document.getElementById("qnaInsertForm").submit();
    }
}

window.onload = () => {
    createEditor();
}