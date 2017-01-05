"use strict";

const addCategory = (req, res, next) => {
    const user = req.user,
        category = {
            header: req.header,
            body: req.body,
            image: req.image,
            description: req.description,
            title: req.title,
            parentId: req.parentId,
            deepLevel: null,
            added: null
        };

    //blogModel.getParentCategory(category.parentId)

};

const addPage = (req, res, next) => {

};

module.exports = {
    addCategory,
    addPage
};