import { Request, Response } from "express";

import SendGrid from "@sendgrid/mail";
import * as Sentry from "@sentry/node";

export default async (req: Request, res: Response) => {
    require("dotenv").config();

    // Invalid Hostname
    if(req.headers.origin !== "https://contact.wdh.gg") return res.status(401).json({ message: "Request is coming from an unauthorised origin.", code: "UNAUTHORISED_ORIGIN" });

    // Invalid Body
    if(!req.body.firstname) return res.status(400).json({ message: "No first name specified.", code: "NO_FIRST_NAME" });
    if(!req.body.lastname) return res.status(400).json({ message: "No last name specified.", code: "NO_LAST_NAME" });
    if(!req.body.email) return res.status(400).json({ message: "No email specified.", code: "NO_EMAIL" });
    if(!req.body.message) return res.status(400).json({ message: "No message specified.", code: "NO_MESSAGE" });

    const name = `${req.body.firstname} ${req.body.lastname}`;

    SendGrid.setApiKey(process.env.sendgrid_api_key);

    const email = {
        to: process.env.to_email,
        from: `${process.env.from_name} <${process.env.from_email}>`,
        replyTo: req.body.email,
        subject: `Contact Form: ${name}`,
        text: `Name: ${name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}`,
        html: `<strong>Name</strong>: ${name}<br><strong>Email</strong>: ${req.body.email}<br><br><strong>Message</strong>:<br>${req.body.message}`
    }

    try {
        await SendGrid.send(email);

        res.status(200).json({ message: "Your contact form has been submitted.", code: "FORM_SUBMITTED" });
    } catch(err) {
        Sentry.captureException(err);
        console.error(err);

        res.status(500).json({ message: "An error occurred.", code: "SERVER_ERROR" });
    }
}
