const { Model, DataTypes, DATE } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class Notes extends Model {
    // checkPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    // }
}

Notes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //     },
        // },
        videos_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'videos',
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

module.exports = Notes;