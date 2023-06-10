module.exports = async (req, res) => {
    const id = req.params.id;

    const request = await fetch(`https://api.lanyard.rest/v1/users/${id}`).then((res) => res.json());

    if(!request.success && request.error.code === "user_not_monitored") return res.status(400).json({ "error": "USER_NOT_MONITORED", "message": "https://discord.gg/7BxbX8jKtb" });

    res.status(200).json({
        "user": {
            "profile": {
                "avatar": {
                    "url": `https://cdn.discordapp.com/avatars/${request.data.discord_user.id}/${request.data.discord_user.avatar}`,
                    "hash": request.data.discord_user.avatar,
                    "decoration": request.data.discord_user.avatar_decoration
                },
                "display_name": request.data.discord_user.global_name,
                "username": request.data.discord_user.username,
                "discriminator": request.data.discord_user.discriminator === "0" ? null : request.data.discord_user.discriminator,
                "pomelo_username": request.data.discord_user.discriminator === "0" ? true : false
            },
            "id": request.data.discord_user.id,
            "bot": request.data.discord_user.bot,
            "status": request.data.discord_status,
            "flags": request.data.discord_user.public_flags
        },
        "active": {
            "website": request.data.active_on_discord_web,
            "desktop": request.data.active_on_discord_desktop,
            "mobile": request.data.active_on_discord_mobile
        },
        "status": {
            "activities": request.data.activities,
            "spotify": {
                "data": request.data.spotify,
                "listening": request.data.listening_to_spotify
            }
        },
        "custom": {
            "kv": request.data.kv
        }
    })
}
