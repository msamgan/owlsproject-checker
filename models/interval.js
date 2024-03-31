"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Interval extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Interval.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            value: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Interval",
            underscored: true,
            CreatedAt: "created_at",
            UpdatedAt: "updated_at"
        }
    )
    return Interval
}
