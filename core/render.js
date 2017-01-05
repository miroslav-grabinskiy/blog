"use strict";

const menu = require('./menu');
const panel = require('./panel');

const renderPage = (res, options) => {
    const panelOptions = {
        type: options.type,
        currentPage: options.currentPage,
        auth: options.auth
    };

    let context = {
        menu: menu.getMenu(),
        menuAuth:  panel.getMenuAuth(panelOptions),
        menuPanel: panel.getMenuPanel(),
        title: options.title,
        descriptions: options.description,
        auth: options.auth,
        user: options.user
    };

    _.assign(context, options.context);
    
    res.render(options.render, context)
};

const renderAdminPage = (res, options) => {
    const panelOptions = {
        type: options.type,
        currentPage: options.currentPage,
        auth: options.auth,
        isAdminPage: true
    };

    let context = {
        menu: menu.getMenu(),
        menuAuth:  panel.getMenuAuth(panelOptions),
        menuPanel: panel.getMenuPanel(),
        title: options.title,
        descriptions: options.description,
        auth: options.auth,
        user: options.user,
        role: options.user.role
    };

    _.assign(context, options.context);

    res.render(options.render, context)
};

module.exports = {
    renderPage,
    renderAdminPage
};