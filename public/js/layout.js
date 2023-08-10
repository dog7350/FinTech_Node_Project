let flag = false;

const menuClick = () => {
    const container = document.getElementById("userContainer");
    const info = document.getElementById("infoContainer");
    const chat = document.getElementById("chatContainer");

    if (flag == false) {
        container.style.visibility = "visible";
        container.style.backgroundColor = "skyblue";
        container.style.opacity = "1";
        container.style.width = "300px";

        setTimeout(() => {
            info.style.display = "block";
            chat.style.display = "block";
        }, 220)

        flag = true;
    } else {
        container.style.backgroundColor = "white";
        container.style.opacity = "0";
        container.style.width = "0px";

        setTimeout(() => {
            container.style.visibility = "hidden";
            info.style.display = "none";
            chat.style.display = "none";
        }, 160);

        flag = false;
    }
}

window.onload = () => {
    const button = document.getElementById("userMenuButton");
    button.addEventListener("click", menuClick);
}