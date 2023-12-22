import { Router, Request, Response } from "express";

const router = Router();
import routes from "./routes";

import rateLimit from "express-rate-limit";

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

router.post("/forms/contact", formLimiter, async (req: Request, res: Response) => {
    routes.forms.contact(req, res);
})

router.get("/gravatar", async (req: Request, res: Response) => {
    routes.gravatar(req, res);
})

export default router;
