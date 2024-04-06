const MonitorRepository = require("./repositories/monitor.repository")
const { runWebsiteMonitorCheck } = require("./checkers/website.checker")
const { startDowntime, endDowntime } = require("./repositories/inspection.repository")
const { sendNotification } = require("./utils/methods")
const { runPingMonitorCheck } = require("./checkers/ping.checker")
const { MONITOR_TYPES } = require("./utils/constants")

const websiteMonitor = (monitor, checkFor) => {
    runWebsiteMonitorCheck(monitor).then((monitorStatus) => {
        if (monitorStatus.status === "down" && checkFor === "up") {
            startDowntime(monitor.id, monitorStatus.statusCode, monitorStatus.message)
            sendNotification({ monitor_id: monitor.id, notification_type: "monitor_down" }).then(() => {})
        }

        if (monitorStatus.status === "up" && checkFor === "down") {
            endDowntime(monitor.id)
            sendNotification({ monitor_id: monitor.id, notification_type: "monitor_up" }).then(() => {})
        }
    })
}

const pingMonitor = (monitor, checkFor) => {
    runPingMonitorCheck(monitor).then((monitorStatus) => {
        if (monitorStatus.status === "down" && checkFor === "up") {
            startDowntime(monitor.id, monitorStatus.statusCode, monitorStatus.message)
            sendNotification({ monitor_id: monitor.id, notification_type: "monitor_down" }).then(() => {})
        }

        if (monitorStatus.status === "up" && checkFor === "down") {
            endDowntime(monitor.id)
            sendNotification({ monitor_id: monitor.id, notification_type: "monitor_up" }).then(() => {})
        }
    })
}

exports.monitor = async (checkFor, interval, monitorType) => {
    let maxBatch = await MonitorRepository.getMaxBatch(monitorType, interval)

    if (!maxBatch) {
        return
    }

    for (let i = 1; i <= maxBatch; i++) {
        // interval is invalid for down monitors in getMonitorsToCheck function
        let monitors = await MonitorRepository.getMonitorsToCheck(checkFor, i, monitorType, interval)

        if (monitors.length === 0) {
            // console.log('monitor type:', monitorType, 'interval:', interval, 'batch:', i, 'no monitors to check')
            continue
        }

        for (let monitor of monitors) {
            if (monitorType === MONITOR_TYPES.WEBSITE_MONITOR) {
                websiteMonitor(monitor, checkFor)
            }

            if (monitorType === MONITOR_TYPES.PING_MONITOR) {
                pingMonitor(monitor, checkFor)
            }
        }

        // delay for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000))
    }
}
