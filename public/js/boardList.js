location.href='/board/boardForm'
function boardMake() {
    if(user === undefined) {
        alert("로그인해주세요!!!")
        location.href='/board/'
    }else {
        location.href="/"
    }
}