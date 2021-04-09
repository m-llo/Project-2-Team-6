const { Model, DataTypes, DATE } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class Videos extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Videos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        video_title: {
            type: DataTypes.INTEGER,
            references: {
                model: 'video',
                key: 'id',
            },
        },
        video_id: {
            type: DataTypes.INTEGER,
            url: DataTypes.STRING,
            references: {
                model: 'video',
                key: 'id',
            },
        },
        notes_id: {
            type: DataTypes.STRING,
            references: {
                model: 'notes',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'notes',
    }
);

module.exports = Videos;