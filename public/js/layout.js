const userMenuOpen = () => {
    const container = document.getElementById("userContainer");
    const info = document.getElementById("infoContainer");
    const chat = document.getElementById("chatContainer");

    container.style.visibility = "visible";
    container.style.opacity = "1";
    container.style.width = "300px";

    setTimeout(() => {
        info.style.display = "block";
        chat.style.display = "block";
    }, 220)
}

const userMenuClose = () => {
    const container = document.getElementById("userContainer");
    const info = document.getElementById("infoContainer");
    const chat = document.getElementById("chatContainer");

    container.style.opacity = "0";
    container.style.width = "0px";

    setTimeout(() => {
        container.style.visibility = "hidden";
        info.style.display = "none";
        chat.style.display = "none";
    }, 160);
}

window.onload = () => {
    const userMenuButton = document.getElementById("userMenuButton");
    const exitUserButton = document.getElementById("exitUserMenu");
    userMenuButton.addEventListener("click", userMenuOpen);
    exitUserButton.addEventListener("click", userMenuClose);
}