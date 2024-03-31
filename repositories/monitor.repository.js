const { Monitor } = require("../models")

/**
 * Get monitors to check
 * @param status
 * @param batch
 * @param monitorType
 * @param interval
 * @returns {Promise<Monitor[]>}
 */
exports.getMonitorsToCheck = async (status, batch, monitorType, interval) => {
    let whereObject = {
        status: status,
        batch: batch,
        monitor_type: monitorType
    }

    if (interval) {
        whereObject.interval = interval
    }

    return await Monitor.findAll({
        where: whereObject
    })
}

exports.getMaxBatch = async (monitorType, interval) => {
    let whereObject = {
        monitor_type: monitorType
    }

    if (interval) {
        whereObject.interval = interval
    }

    return await Monitor.max("batch", {
        where: whereObject
    })
}

exports.updateMonitorStatus = (monitor, status) => {
    Monitor.update(
        {
            status: status,
            last_check: new Date()
        },
        {
            where: {
                id: monitor.id
            }
        }
    ).then((r) => {
        //
    })
}
