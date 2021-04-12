const sequelize = require('../config/connection');
const { User, Hobby } = require('../models');

const userData = require('./userData.json');
const hobbyData = require('./hobbyData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const hobby = await Hobby.bulkCreate(hobbyData, {
    individualHooks: true,
    returning: true,
  });



  process.exit(0);
};

seedDatabase();
