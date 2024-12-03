const bcrypt = require("bcrypt")
// const {sequelize, DataTypes} = require("sequelize")

module.exports =(sequelize, DataTypes) =>{
    
    const user = sequelize.define("user",{
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue:'user'
        }
    });

    // function to hash password before saving...............

    user.beforeCreate(async(user) =>{
        try {
            
            const salt = await bcrypt.genSalt(12);
            const hashedpwd = await bcrypt.hash(user.password, salt);
            user.password = hashedpwd;
        } catch (error) {
            throw new Error("Error encrypting password");
        }
    });

    // function to compare thr entered password with the saved hashed password

    user.prototype.isValidPassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    };

    return user

}