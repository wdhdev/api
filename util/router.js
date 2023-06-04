const { Router } = require("express");

const router = Router();
const routes = require("./routes");

const rateLimit = require("express-rate-limit");

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

router.get("/", async (req, res) => {
    routes.index(req, res);
})

router.get("/discord/invite-info", async (req, res) => {
    routes.discord["invite-info"](req, res);
})

router.post("/discord/invite-info", async (req, res) => {
    routes.discord["invite-info"](req, res);
})

router.post("/forms/contact", formLimiter, async (req, res) => {
    routes.forms.contact(req, res);
})

router.get("/gravatar", limiter, async (req, res) => {
    routes.gravatar(req, res);
})

router.post("/gravatar", limiter, async (req, res) => {
    routes.gravatar(req, res);
})

router.get("/lanyard", async (req, res) => {
    routes.lanyard.index(req, res);
})

router.post("/lanyard", async (req, res) => {
    routes.lanyard.index(req, res);
})

router.get("/lanyard/kv", async (req, res) => {
    routes.lanyard.kv(req, res);
})

router.post("/lanyard/kv", async (req, res) => {
    routes.lanyard.kv(req, res);
})

module.exports = router;