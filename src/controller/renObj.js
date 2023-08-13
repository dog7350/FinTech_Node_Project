const obj = (req, obj) => {
    obj['user'] = req.session.user;
    return obj;
}

module.exports = obj;