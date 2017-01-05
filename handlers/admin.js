"use strict";

const render = require(appRoot + '/core/render');
const menu = require(appRoot + '/core/menu');

const renderAdminIndexPage = (req, res, next) => {
    const user = req.user;

    render.renderAdminPage(res, {
        render: 'admin/partials/index.jade',
        auth: !!user,
        user,
        type: 1,
        title: 'Admin Panel',
        description: 'Admin panel',
        currentPage: 'admin'
    });
};

const renderAdminPagesPage = (req, res, next) => {
    const user = req.user;

    const pages = menu.getPages();

    render.renderAdminPage(res, {
        render: 'admin/partials/index.jade',
        auth: !!user,
        user,
        type: 1,
        title: 'Admin Panel',
        description: 'Admin panel',
        currentPage: 'admin',
        sitePages
    });
};

const renderAdminCategoriesPage = (req, res, next) => {
    const user = req.user;

    const siteCategories = menu.getCategoriesAndSubCategories();

    render.renderAdminPage(res, {
        render: 'admin/partials/categories.jade',
        auth: !!user,
        user,
        type: 1,
        title: 'Admin Panel',
        description: 'Admin panel',
        currentPage: 'admin',
        siteCategories
    });
};

module.exports = {
    renderAdminIndexPage,
    renderAdminCategoriesPage,
    renderAdminPagesPage
};