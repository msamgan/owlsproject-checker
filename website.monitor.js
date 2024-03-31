const MonitorRepository = require("./repositories/monitor.repository")
const { runCheck } = require("./checkers/website.checker")
const { startDowntime, endDowntime } = require("./repositories/inspection.repository")
const { sendNotification } = require("./utils/methods")

exports.websiteMonitor = async (checkFor, interval) => {
    let maxBatch = await MonitorRepository.getMaxBatch("website-monitor", interval)

    if (!maxBatch) {
        return
    }

    for (let i = 1; i <= maxBatch; i++) {
        // interval is invalid for down monitors in getMonitorsToCheck function
        let monitors = await MonitorRepository.getMonitorsToCheck(checkFor, i, "website-monitor", interval)

        if (monitors.length === 0) {
            // console.log("No monitor to check for interval:", interval, "batch:", i)
            continue
        }

        for (let monitor of monitors) {
            runCheck(monitor).then((status) => {
                if (status === "down" && checkFor === "up") {
                    startDowntime(monitor.id)
                    sendNotification({ monitor_id: monitor.id, notification_type: "monitor_down" })
                }

                if (status === "up" && checkFor === "down") {
                    endDowntime(monitor.id)
                    sendNotification({ monitor_id: monitor.id, notification_type: "monitor_up" })
                }
            })
        }

        // delay for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000))
    }
}
