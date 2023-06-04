module.exports = async (req, res) => {
    const id = req.query.id || req.body.id;

    if(!id) return res.status(400).json({ "message": "No user ID specified.", "code": "NO_USER_ID" });

    const request = await fetch(`https://api.lanyard.rest/v1/users/${id}`).then((res) => res.json());

    if(!request.success && request.error.code === "user_not_monitored") return res.status(500).json({ "error": "USER_NOT_MONITORED", "message": "https://discord.gg/7BxbX8jKtb" });

    res.status(200).json({
        "user": {
            "status": request.data.discord_status,
            "flags": request.data.discord_user.public_flags,
            "full_username": `${request.data.discord_user.username}#${request.data.discord_user.discriminator}`,
            "username": request.data.discord_user.username,
            "discriminator": request.data.discord_user.discriminator,
            "id": request.data.discord_user.id,
            "bot": request.data.discord_user.bot,
            "display_name": request.data.discord_user.display_name,
            "avatar": {
                "id": request.data.discord_user.avatar,
                "decoration": request.data.discord_user.avatar_decoration
            }
        },
        "active": {
            "website": request.data.active_on_discord_web,
            "desktop": request.data.active_on_discord_desktop,
            "mobile": request.data.active_on_discord_mobile
        },
        "activities": request.data.activities,
        "spotify": {
            "data": request.data.spotify,
            "listening": request.data.listening_to_spotify
        }
    })
}
