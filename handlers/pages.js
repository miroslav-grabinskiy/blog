"use strict";

const libs = require(appRoot + '/libs/custom');
const render = require(appRoot + '/core/render');

const renderIndex = (req, res, next) => {
    const user = req.user;

    const options = {
        render: 'site/partials/index.jade',
        auth: !!user,
        user,
        type: 1,
        title: 'Best Blog',
        description: 'The First Page',
        currentPage: 'index'
    };

    render.renderPage(res, options);
};

module.exports = {
    renderIndex
};