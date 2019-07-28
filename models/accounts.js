
// Model for the Accounts(Users) Table
module.exports = function(Sequelize, DataTypes) {
    var Accounts = sequelize.define('Accounts', {
        userID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            len: {
                args: [1, 100]
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            len: {
                args: [1, 255]
            }
        }
    });
    return Accounts;
}


