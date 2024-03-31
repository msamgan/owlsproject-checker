const { Inspection, Downtime, Interval } = require("../models")

exports.addInspection = (monitorId, status, latency, statusCode) => {
    Inspection.create({
        monitor_id: monitorId,
        status: status,
        latency: latency,
        status_code: statusCode || 500
    }).then((r) => {
        //
    })
}

exports.startDowntime = (monitorId, statusCode, errorMessage) => {
    Downtime.create({
        monitor_id: monitorId,
        started_at: new Date(),
        status_code: statusCode,
        error_message: errorMessage
    }).then((r) => {
        //
    })
}

exports.endDowntime = (monitorId) => {
    Downtime.findOne({
        where: {
            monitor_id: monitorId,
            ended_at: null
        }
    }).then((downtime) => {
        if (downtime) {
            downtime.ended_at = new Date()
            downtime.duration = new Date(downtime.ended_at).getTime() - new Date(downtime.started_at).getTime()
            downtime.save()
        }
    })
}

exports.getIntervals = async () => {
    return await Interval.findAll({})
}
