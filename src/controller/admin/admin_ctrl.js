const service = require("../../service/admin_service");

const views = {
    list : async (req, res) => {
        const totalContent = await service.read.totalContent();

        const data = await service.read.list(req.query.start, totalContent);
        res.render("admin/list", renObj(req, {list:data.list, start:data.start, page:data.page}));
    }
};

const process = {

};

module.exports = { views, process };