import { Router, Request, Response } from "express";

const router = Router();
import routes from "./routes";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	max: 240, // 240 requests
	standardHeaders: true,
	legacyHeaders: false
})

const formLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: 2, // 2 requests
	standardHeaders: true,
	legacyHeaders: false,
    message: {
        "message": "Too many requests, try again later.",
        "code": "RATE_LIMITED"
    }
})

router.get("/", async (req: Request, res: Response) => {
    routes.index(req, res);
})

router.get("/discord/invite/:code", async (req: Request, res: Response) => {
    routes.discord.invite(req, res);
})

router.post("/forms/contact", formLimiter, async (req: Request, res: Response) => {
    routes.forms.contact(req, res);
})

router.get("/gravatar", limiter, async (req: Request, res: Response) => {
    routes.gravatar(req, res);
})

router.get("/lanyard/:id", async (req: Request, res: Response) => {
    routes.lanyard(req, res);
})

export default router;
