"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Downtime extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Downtime.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            monitor_id: DataTypes.INTEGER,
            started_at: DataTypes.DATE,
            ended_at: DataTypes.DATE,
            duration: DataTypes.INTEGER,
            status_code: DataTypes.INTEGER,
            error_message: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Downtime",
            underscored: true,
            CreatedAt: "created_at",
            UpdatedAt: "updated_at"
        }
    )
    return Downtime
}
