const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    isAdmin: {
      type: DataTypes.STRING,
      defaultValue: 'super'
    },
    age: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    },
    walletBalance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isDecimal: true
      }
    },
    profilePic: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    }
  })

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }
  return User
}
