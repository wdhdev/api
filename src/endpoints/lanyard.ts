import { Request, Response } from "express";
const fetch = require("node-fetch");

export default async (req: Request, res: Response) => {
    const id = req.params.id;

    const request: any = await fetch(`https://api.lanyard.rest/v1/users/${id}`).then((response: any) => response.json());

    if(!request.success) return res.status(400).json(request);

    const data = request.data;

    res.status(200).json({
        user: {
            username: data.discord_user.username,
            discriminator: data.discord_user.discriminator,
            display_name: data.discord_user.global_name,
            id: data.discord_user.id,
            bot: data.discord_user.bot,
            status: data.discord_status,
            flags: data.discord_user.public_flags,
            avatar: {
                hash: data.discord_user.avatar,
                decoration: data.discord_user.avatar_decoration
            }
        },
        active: {
            website: data.active_on_discord_web,
            desktop: data.active_on_discord_desktop,
            mobile: data.active_on_discord_mobile
        },
        status: {
            activities: data.activities,
            spotify: {
                data: data.spotify,
                listening: data.listening_to_spotify
            }
        },
        custom: {
            kv: data.kv
        }
    })
}
