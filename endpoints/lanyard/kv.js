module.exports = async (req, res) => {
    const id = req.query.id || req.body.id;

    const request = await fetch(`https://api.lanyard.rest/v1/users/${id}`).then((res) => res.json());

    if(!request.success && request.error.code === "user_not_monitored") return res.status(500).json({ "error": "USER_NOT_MONITORED", "message": "https://discord.gg/7BxbX8jKtb" });

    res.status(200).json(request.data.kv);
}