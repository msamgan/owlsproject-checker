require("dotenv").config()

const { setCron } = require("./cron.setter")

setCron().then(() => {})
