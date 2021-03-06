const { Model, DataTypes, } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class Videos extends Model {}

Videos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        
        title: {
            type: DataTypes.STRING,
        },
        youtube_id: {
            type: DataTypes.STRING,
        },
        // URL: {
        //     type: DataTypes.STRING,
        //     // url: DataTypes.STRING,
        // },
        thumbnail: {
            type: DataTypes.STRING,
            // url: DataTypes.STRING,
        },
        // description: {
        //     type: DataTypes.STRING,
        //     // url: DataTypes.STRING,
        // },
        
        hobby_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'hobby',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'videos',
    }
);

module.exports = Videos;