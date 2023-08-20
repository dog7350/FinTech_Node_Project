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

function thumReadFile(input) {
    const file = input.file[0];
    if(file != "") {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            document.querySelector("#thumnailView").src = e.target.result;
        }
    }
}

function formCheck() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("txt").value;
    
    if(title == "") {
        alert("제목을 입력해주세요");
        return;
    }else if(content == "") {
        alert("내용을 입력해주세요");
        return;
    }else {
        alert("글이 등록되었습니다!");
        return document.getElementById("boardForm").submit();  
    }
}



