const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
