const cron = require("node-cron")

const { getIntervals } = require("./repositories/inspection.repository")
const { websiteMonitor } = require("./website.monitor")

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

exports.websiteMonitorCronSetter = async () => {
    let intervals = await this.getFormattedIntervals()
    intervals.forEach((interval) => {
        // console.log("Starting cron for:", interval.name)
        cron.schedule(interval.cron, () => {
            websiteMonitor("up", interval.value).then(() => {
                //
            })
        })
    })

    // console.log("Starting cron for down monitors every 30 seconds")
    cron.schedule("*/30 * * * * *", () => {
        websiteMonitor("down", null).then(() => {
            //
        })
    })
}
