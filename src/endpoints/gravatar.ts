import { Request, Response } from "express";

import { gravatar, validate } from "william.js";

export default async (req: Request, res: Response) => {
    const email = req.query.email as string;

    if(!email) return res.status(400).send({ message: "No email specified.", code: "NO_EMAIL" });
    if(!validate.email(email)) return res.status(400).send({ message: "Invalid email specified.", code: "INVALID_EMAIL" });

    const gravatarURL = gravatar(email.toLowerCase());

    res.status(200).json({ email: email.toLowerCase(), hash: gravatarURL.replace("https://gravatar.com/avatar/", ""), url: gravatarURL });
}
