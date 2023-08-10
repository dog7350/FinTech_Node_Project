function readURL(input) { // 미리보기
    // 파일에 대한 정보
    const file = input.files[0];
    console.log(file);
    if (file != "") {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            console.log(e.target.result); // 실제 이미지 데이터
            document.getElementById("preview").src = e.target.result;
        }
    }
}