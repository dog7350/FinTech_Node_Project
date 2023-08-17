function readFile(input) {
    const file = input.files[0];
    if(file != "") {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            document.getElementById("imgView").src = e.target.result;
        }
    }
}

function formCheck() {
    var Title = document.getElementsByClassName("title").value;
    if(Title == "") {
        alert("제목을 입력해주세요");
        Title.focus();
        return false;
    }

    var Text = document.getElementById("txt").value;
    if(Text == "") {
        alert("내용을 입력해주세요");
        Text.focus();
        return false;
    }
}

