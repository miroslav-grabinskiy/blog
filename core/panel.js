"use strict";

const menu = require('./menu');

const getMenuAuth = (options) => {
    let hrefs;

    if (!options.auth) {
        hrefs = {
            login: '/login',
            registration: '/registration'
        };

        removeCurrentPage(hrefs);
    } else {
        hrefs = {
            logout: '/logout'
        };
        
        if (options.isAdminPage) {
            hrefs['back to site'] = '/';
        } else {
            hrefs['admin-panel'] = '/admin';
        }
    }

    return hrefs;

    function removeCurrentPage(hrefs) {
        Object.keys(hrefs).forEach( item => {
            if (item === options.currentPage) {
                delete hrefs[item];
            }
        });
    }
};

const getMenuPanel = () => {
    return {
        'categories': '/admin/categories',
        'pages': '/admin/pages'
    }
};

module.exports = {
    getMenuAuth,
    getMenuPanel
};