import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    res.status(200).json({
        endpoints: {
            discord: {
                invite: {
                    method: "GET",
                    description: "Get information about a Discord invite.",
                    usage: "GET /discord/invite/:code"
                }
            },
            gravatar: {
                method: "GET",
                description: "Get a person's Gravatar using their email.",
                usage: "GET /gravatar?email=:email"
            },
            lanyard: {
                method: "GET",
                description:
                    "Get someone's Discord presence using the Lanyard API.",
                usage: "GET /lanyard/:id"
            }
        }
    })
}
