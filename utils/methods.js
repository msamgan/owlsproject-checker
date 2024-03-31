const config = require("../config/config.json")[process.env.NODE_ENV]

exports.sendNotification = async (data) => {
    try {
        let response = await fetch(config.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.communication_token}`
            },
            body: JSON.stringify(data)
        })

        if (response.status !== 200) {
            console.log("Error:", response.status)
            return false
        }

        return true
    } catch (error) {
        console.log("Error:", error)

        return false
    }
}
