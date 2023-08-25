import { Request, Response } from "express";
import gravatarUrl from "gravatar-url";

export default async (req: Request, res: Response) => {
    const { email } = req.body;

    if(!email) return res.status(400).send({ message: "No email specified.", code: "NO_EMAIL" });
    if(!validateEmail(email)) return res.status(400).send({ message: "Invalid email specified.", code: "INVALID_EMAIL" });

    const gravatarURL = gravatarUrl(email.toLowerCase());

    res.status(200).json({ email: email.toLowerCase(), hash: gravatarURL.replace("https://gravatar.com/avatar/", ""), url: gravatarURL });
}

function validateEmail(input: string): boolean {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return input.match(regex) ? true : false;
}
