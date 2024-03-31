require("dotenv").config()

const { websiteMonitorCronSetter } = require("./cron.setter")

websiteMonitorCronSetter().then(() => {
    //
});
