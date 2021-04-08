const User = require('./User');
const Hobby = require('./Hobby');
const Video = require('./Video');
const Note = require('./Note');

Hobby.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Hobby, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Video.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Video, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Note.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Note, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Video.belongsTo(Hobby, {
    foreignKey: 'hobby_id'
});

Hobby.hasMany(Video, {
    foreignKey: 'hobby_id',
    onDelete: 'CASCADE',
});

Note.belongsTo(Video, {
    foreignKey: 'video_id'
});

Video.hasMany(Note, {
    foreignKey: 'video_id',
    onDelete: 'CASCADE',
});


module.exports = {
    User,
    Hobby,
    Video,
    Note,
};