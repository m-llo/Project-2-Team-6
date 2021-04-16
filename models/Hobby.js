const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hobby extends Model {}

Hobby.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        createdAt:false,
        updatedAt:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'hobby',
    }
);

module.exports = Hobby