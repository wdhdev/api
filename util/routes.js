module.exports = {
    "discord": {
        "invite-info": require("../endpoints/discord/invite-info")
    },
    "forms": {
        "contact": require("../endpoints/forms/contact")
    },
    "gravatar": require("../endpoints/gravatar"),
    "index": require("../endpoints/index"),
    "lanyard": {
        "index": require("../endpoints/lanyard"),
        "kv": require("../endpoints/lanyard/kv")
    }
}