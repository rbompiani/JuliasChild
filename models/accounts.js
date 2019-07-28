
// Model for the Accounts(Users) Table
module.exports = function(sequelize, DataTypes) {
    var Accounts = sequelize.define('Accounts', {
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                args: [1, 100]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                args: [1, 255]
            }
        }
    });
    return Accounts;
}


