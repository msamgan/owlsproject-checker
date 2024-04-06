const cron = require("node-cron")

const { getIntervals } = require("./repositories/inspection.repository")
const { monitor } = require("./monitor")
const { MONITOR_TYPES, STATUS } = require("./utils/constants")

exports.getFormattedIntervals = async () => {
    let intervals = await getIntervals()
    let intervalCrone = []

    intervals.forEach((interval) => {
        let intervalValueLastChar = interval.value.slice(-1)
        let intervalValueWithOutLastChar = interval.value.slice(0, -1)
        let intervalCron = null

        if (intervalValueLastChar === "s") {
            intervalCron = `*/${intervalValueWithOutLastChar} * * * * *`
        }

        if (intervalValueLastChar === "m") {
            intervalCron = `*/${intervalValueWithOutLastChar} * * * *`
        }

        if (intervalValueLastChar === "h") {
            intervalCron = `0 */${intervalValueWithOutLastChar} * * *`
        }

        if (intervalValueLastChar === "d") {
            intervalCron = `0 0 */${intervalValueWithOutLastChar} * *`
        }

        intervalCrone.push({
            id: interval.id,
            name: interval.name,
            value: interval.value,
            cron: intervalCron
        })
    })

    return intervalCrone
}

exports.setCron = async () => {
    let intervals = await this.getFormattedIntervals()
    intervals.forEach((interval) => {
        // console.log("Starting cron for:", interval.name)
        cron.schedule(interval.cron, () => {
            monitor(STATUS.UP, interval.value, MONITOR_TYPES.WEBSITE_MONITOR).then(() => {})
            monitor(STATUS.UP, interval.value, MONITOR_TYPES.PING_MONITOR).then(() => {})
        })
    })

    cron.schedule("*/10 * * * * *", () => {
        monitor(STATUS.DOWN, null, MONITOR_TYPES.WEBSITE_MONITOR).then(() => {})
        monitor(STATUS.DOWN, null, MONITOR_TYPES.PING_MONITOR).then(() => {})
    })
}
