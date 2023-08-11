const showLoginModal = () => {
    $("#modalContainer").slideDown("slow");
    $("#modalBackground").show();
}

const hideLoginModal = () => {
    $("#modalContainer").slideUp("fast");
    $("#modalBackground").hide();
}