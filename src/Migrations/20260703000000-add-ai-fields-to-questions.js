'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('Questions', 'source', {
      type: Sequelize.STRING,
      defaultValue: 'manual' // 'manual' | 'ai'
    });

    await queryInterface.addColumn('Questions', 'rationale', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Questions', 'source');
    await queryInterface.removeColumn('Questions', 'rationale');
  }
};
