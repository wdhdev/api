module.exports = async (req, res) => {
    const gravatar = require("gravatar-url");

    const email = req.query.email || req.body.email;

    if(!email) return res.status(400).send({ "message": "No email specified.", "code": "NO_EMAIL" });
    if(!validateEmail(email)) return res.status(400).send({ "message": "Invalid email specified.", "code": "INVALID_EMAIL" });

    const gravatarURL = gravatar(email);

    res.status(200).json({ "url": gravatarURL });

    function validateEmail(input) {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(input.match(regex)) return true;

        return false;
    }
}