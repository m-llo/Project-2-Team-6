const User = require('./User');
const Hobby = require('./Hobby');
const Videos = require('./Videos');
const Notes = require('./Notes');

Hobby.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Hobby, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Videos.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Videos, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Notes.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Notes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Videos.belongsTo(Hobby, {
    foreignKey: 'hobby_id'
});

Hobby.hasMany(Videos, {
    foreignKey: 'hobby_id',
    onDelete: 'CASCADE',
});

Notes.belongsTo(Videos, {
    foreignKey: 'video_id'
});

Videos.hasMany(Notes, {
    foreignKey: 'video_id',
    onDelete: 'CASCADE',
});


module.exports = {
    User,
    Hobby,
    Videos,
    Notes,
};