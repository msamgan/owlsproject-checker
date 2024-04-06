const ping = require("ping")
const { updateMonitorStatus } = require("../repositories/monitor.repository")
const { addInspection } = require("../repositories/inspection.repository")

exports.runPingMonitorCheck = async (monitor) => {
    let response = await ping.promise.probe(monitor.hostname)

    let uptimeStatus = {
        status: response.alive ? "up" : "down",
        statusCode: response.alive ? 200 : 500,
        message: response.alive ? "Monitor is up" : "Monitor is down"
    }

    updateMonitorStatus(monitor, uptimeStatus.status)

    addInspection(monitor.id, uptimeStatus.status, response.time, uptimeStatus.statusCode)

    return uptimeStatus
}
