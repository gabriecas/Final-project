'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      video_url: {
        type: Sequelize.STRING,
      },
      seconds_long: {
        type: Sequelize.INTEGER,
      },
      course_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('episodes')
  }
};
