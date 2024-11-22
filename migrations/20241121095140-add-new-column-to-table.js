'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'studentId', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // Adjust as needed
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Courses', 'studentId');
  },
};
