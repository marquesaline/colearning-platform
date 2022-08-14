'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      agendaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'agendas',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      allDay: {
        type: Sequelize.BOOLEAN
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      backgroundColor: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      emailAluno: {
        type: Sequelize.STRING
      },
      telefoneAluno: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};