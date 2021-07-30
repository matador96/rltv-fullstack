const Sequelize = require('sequelize');
const sequelize = require('../config/db');

module.exports = sequelize.define(
    'modules',
    {
        param: {
            field: 'param',
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        status: {
            field: 'status',
            type: Sequelize.INTEGER,
        },
        extraData: {
            field: 'extraData',
            type: Sequelize.JSON,
        },
    },
    {
        timestamps: false,
    },
);
