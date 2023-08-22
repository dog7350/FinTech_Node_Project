const openMemberBoard = (id) => {
    var pop = window.open(`/admin/memberBoard?id=${id}`, "pop", "width=1300, height=800, scrollbars=yes, resizable=yes");
}

const openMemberCmt = (id) => {
    var pop = window.open(`/admin/memberCmt?id=${id}`, "pop", "width=1300, height=800, scrollbars=yes, resizable=yes");
}

const openMemberChat = (id) => {
    var pop = window.open(`/admin/memberChat?id=${id}`, "pop", "width=1300, height=800, scrollbars=yes, resizable=yes");
}