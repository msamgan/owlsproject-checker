"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Inspection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Inspection.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            monitor_id: DataTypes.INTEGER,
            status: DataTypes.STRING,
            latency: DataTypes.INTEGER,
            status_code: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "Inspection",
            underscored: true,
            CreatedAt: "created_at",
            UpdatedAt: "updated_at"
        }
    )
    return Inspection
}
