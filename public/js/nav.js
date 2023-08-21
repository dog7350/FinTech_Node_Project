function boardAll (){
    if(user == undefined) {
        alert("로그인해주세요!!!");
        location.href="/"
    }else {
        location.href="/board/boardList?category=all";
    }
}

function boardBuy (){
    if(user == undefined) {
        alert("로그인해주세요!!!");
        location.href="/"
    }else {
        location.href="/board/boardList?category=buy";
    }

}

function boardSell (){
    if(user == undefined) {
        alert("로그인해주세요!!!");
        location.href="/"
    }else {
        location.href="/board/boardList?category=sell";
    }

}


