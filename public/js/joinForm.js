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

function openJuso() {
    var pop = window.open("/member/jusoPopup", "pop", "width=570, height=420, scrollbars=yes, resizable=yes");
}
function jusoCallBack(roadFullAddr, roadAddrPart1, addrDetail, roadAddrPart2, engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn, detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo) {
    document.getElementById("zipCode").value = zipNo;
    document.getElementById("addr").value = roadAddrPart1;
    document.getElementById("addrDetail").value = addrDetail;
}

function mailAuth() {
    var email = document.getElementById("emailTxt").value;
    if (email == "") {
        alert("이메일을 입력하세요.");
        return;
    }
    var pop = window.open("/member/mailAuth?email=" + email, "pop", "width=570, height=420, scrollbars=yes, resizable=yes");
}