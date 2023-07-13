import { Request, Response } from "express";
const fetch = require("node-fetch");

export default async (req: Request, res: Response) => {
    const invite = req.params.code;

    const request = await fetch(`https://discord.com/api/invite/${invite}`).then((response: any) => response.json());

    if(request.code && request.message) return res.json(request);

    res.status(200).json({
        invite: {
            code: request.code,
            expires: request.expires_at,
            type: request.type,
            channel: request.channel,
        },
        guild: {
            information: {
                name: request.guild.name,
                id: request.guild.id,
                description: request.guild.description,
                nsfw: request.guild.nsfw
            },
            images: {
                icon: request.guild.icon,
                banner: request.guild.banner,
                splash: request.guild.splash
            },
            settings: {
                vanity_code: request.guild.vanity_url_code,
                verification_level: request.guild.verification_level,
                nsfw_level: request.guild.nsfw_level
            },
            features: request.guild.features,
            statistics: {
                boosts: request.guild.premium_subscription_count
            },
            welcome_screen: request.guild.welcome_screen
        }
    })
}
