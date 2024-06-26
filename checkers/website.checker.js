const axios = require("axios")
const { updateMonitorStatus } = require("../repositories/monitor.repository")
const { addInspection } = require("../repositories/inspection.repository")
const { STATUS } = require("../utils/constants")

const successStatusCodes = [
    200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308
]

const checkHttpMonitor = async (monitor) => {
    try {
        let response = await axios.get(`${monitor.protocol}://${monitor.hostname}`)
        if (successStatusCodes.includes(response.status)) {
            return {
                status: STATUS.UP,
                statusCode: response.status
            }
        }
    } catch (error) {
        let parsedError = JSON.parse(JSON.stringify(error))

        return {
            status: STATUS.DOWN,
            message: parsedError.message,
            code: parsedError.code,
            statusCode: parsedError.status
        }
    }
}

exports.runWebsiteMonitorCheck = async (monitor) => {
    let startTime = null
    let endTime = null

    startTime = new Date().getTime()
    let uptimeStatus = await checkHttpMonitor(monitor)
    endTime = new Date().getTime()

    let responseTime = endTime - startTime

    updateMonitorStatus(monitor, uptimeStatus.status)

    addInspection(monitor.id, uptimeStatus.status, responseTime, uptimeStatus.statusCode)

    return uptimeStatus
}
