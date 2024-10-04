/*
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'nurse'),
        defaultValue: 'nurse',
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    User.associate = (models) => {
      User.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
      });
    };
  
    return User;
  };
  */