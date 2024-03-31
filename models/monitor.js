"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Monitor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Monitor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            uuid: DataTypes.STRING,
            monitor_type: DataTypes.STRING,
            name: DataTypes.STRING,
            protocol: DataTypes.STRING,
            hostname: DataTypes.STRING,
            port: DataTypes.INTEGER,
            keyword: DataTypes.STRING,
            interval: DataTypes.INTEGER,
            status: DataTypes.STRING,
            batch: DataTypes.INTEGER,
            last_check: DataTypes.DATE,
            notify_when: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Monitor",
            underscored: true,
            CreatedAt: "created_at",
            UpdatedAt: "updated_at"
        }
    )
    return Monitor
}
