const obj = (req, obj) => {
    obj['user'] = req.session.user;
    obj['nowUrl'] = req.originalUrl.split("/")[1];
    return obj;
}

module.exports = obj;