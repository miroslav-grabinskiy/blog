"use strict";

const config = require(appRoot + '/config'),
    mongoose = require(appRoot + '/libs/mongoose'),
    Schema = mongoose.Schema;

const User = require('./user').User;

const categorySchema = new Schema({
    header: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 300
    },
    body: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20000
    },
    image: {
        type: String,
        maxlength: 1000
    },
    deepLevel: {
        type: Number,
        max: 4,
        min: 0,
        default: 0
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    parentId: [ this ],
    added: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        maxlength: 300
    },
    description: {
        type: String,
        maxlength: 400
    },
    attributes: {
        type: Schema.Types.Mixed
    }
});

const Category = mongoose.model('Category', categorySchema);

const customMethods = {

};

module.exports = {
    Category
};

_.assign(module.exports, customMethods);

console.log(Object.keys(module.exports));