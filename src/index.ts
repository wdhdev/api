import express from "express";
const app = express();

require("dotenv").config();

import { Request } from "express";
import { autoDiscoverNodePerformanceMonitoringIntegrations, Handlers, init as Sentry, Integrations } from "@sentry/node";
import bodyParser from "body-parser";
import cors from "cors";

Sentry({
    dsn: process.env.sentry_dsn,
    integrations: [
        new Integrations.Http({ tracing: true }),
        new Integrations.Express({ app }),
        ...autoDiscoverNodePerformanceMonitoringIntegrations()
    ],
    tracesSampleRate: 1.0
})

import router from "./util/router";
const port = process.env.port;

app.use(Handlers.requestHandler());
app.use(Handlers.tracingHandler());

app.use(cors<Request>({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(Handlers.errorHandler());

app.listen(port, () => {
    console.log(`[API] Listening on Port: ${port}`);
})
