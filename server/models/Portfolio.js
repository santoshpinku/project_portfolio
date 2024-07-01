// models/Portfolio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Portfolio = sequelize.define('Portfolio', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    projects: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = Portfolio;
