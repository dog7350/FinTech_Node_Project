function readFile(input) {
    const file = input.files[0];
    if(file != "") {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            document.querySelector("#imgView").src = e.target.result;
        }
    }
}

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
        document.getElementById("modifyForm").submit();
    }
}

window.onload = () => {
    createEditor();
}

function priceView () {
    const cate = document.getElementById("category").value;
    if(cate == "sell") {
        document.getElementById("price").style.display = "block"; 
    }else {
        document.getElementById("price").style.display = "none";
    }
}
