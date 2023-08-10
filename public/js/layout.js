let flag = false;

const menuClick = () => {
    const container = document.getElementById("userContainer");
    const info = document.getElementById("infoContainer");
    const chat = document.getElementById("chatContainer");

    if (flag == false) {
        container.style.visibility = "visible";
        container.style.opacity = "1";
        container.style.width = "300px";
        setTimeout(() => {
            info.style.display = "block";
            chat.style.display = "block";
        }, 200)

        flag = true;
    } else {
        container.style.visibility = "hidden";
        container.style.opacity = "0";
        container.style.width = "0px";
        setTimeout(() => {
            info.style.display = "none";
            chat.style.display = "none";
        }, 180);

        flag = false;
    }
}

window.onload = () => {
    const button = document.getElementById("userMenuButton");
    button.addEventListener("click", menuClick);
}