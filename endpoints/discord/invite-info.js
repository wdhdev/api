module.exports = async (req, res) => {
    const invite = req.query.id || req.body.id;

    if(!invite) return res.status(400).json({ "message": "No invite code specified.", "code": "NO_INVITE" });

    const request = await fetch(`https://discord.com/api/invite/${invite}`).then((res) => res.json());

    res.status(200).json(request);
}