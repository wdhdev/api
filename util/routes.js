module.exports = {
    "discord": {
        "invite": require("../endpoints/discord/invite")
    },
    "forms": {
        "contact": require("../endpoints/forms/contact")
    },
    "gravatar": require("../endpoints/gravatar"),
    "index": require("../endpoints/index"),
    "lanyard": {
        "index": require("../endpoints/lanyard/index"),
        "kv": require("../endpoints/lanyard/kv")
    }
}