const bcrypt = require('bcryptjs');

// npx sequelize-cli db:seed:all

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await queryInterface.bulkInsert('Users', [{
      FirstName: 'Admin',
      LastName: 'Admin',
      Email: 'admin@ruddertech.com',
      PasswordHash: hashedPassword,
      UserType: 'Admin'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { Email: 'admin@example.com' });
  }
};