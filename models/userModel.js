module.exports = function(sequelize, DataTypes) {
    var Accounts = sequelize.define("Accounts", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        timestamps: false
    });
    return Accounts;
};

