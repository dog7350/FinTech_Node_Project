function MouseEvent(){
    const container = document.getElementById("123");

    if(container.style.width == "100px"){
        container.style.width = "40px";
        container.style.height = "40px";
    }else{
    container.style.width = "100px";
    container.style.height = "100px";
    }
}
