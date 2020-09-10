'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 记录id
      user_id: {type: INTEGER }, // 用户的id
      username: {type: STRING(255), allowNull: false}, // 用户名
      password: {type: STRING(255), allowNull: false},// 密码  
      created_at: DATE,// 创建时间
      updated_at: DATE// 更新时间
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
