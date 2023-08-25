import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    res.status(200).json({
        endpoints: {
            gravatar: {
                method: "GET",
                description: "Get a person's Gravatar using their email.",
                usage: "GET /gravatar?email=:email"
            }
        }
    })
}
