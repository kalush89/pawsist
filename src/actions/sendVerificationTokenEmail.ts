'use server';

import { nanoid } from 'nanoid';
import { getUserByEmail } from "./auth";
import { db } from '@/db';
import { addHours } from "date-fns";
import { sendAppEmail } from '@/utils/helper';

export const sendVerificationTokenEmail = async ({ emailId }: { emailId: string }) => {
    const response = await getUserByEmail(emailId);
    if (response) {
        const token = nanoid(33);
        const htmlBody = `Click <a href="http://localhost:3000/resetUserPassword/${token}">here</a> to reset your password!`;
        await sendAppEmail(emailId, "Hello ✔", htmlBody);
    //     var transport = nodemailer.createTransport({
    //         host: "sandbox.smtp.mailtrap.io",
    //         port: 2525,
    //         auth: {
    //             user: process.env.MAILTRAP_USER,
    //             pass: process.env.MAILTRAP_PASS
    //         }
    //     });

    //    // const htmlBody = `Click <a href="http://localhost:3000/resetUserPassword/${token}">here</a> to reset your password!`;
    //     const info = await transport.sendMail({
    //         from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    //         to: "bar@example.com, baz@example.com", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: htmlBody, // html body
    //     });

    //     console.log("Message sent: %s", info.messageId);

        //save token in the database
        await db.verificationToken.create({
            data: {
                identifier: emailId!,  // User's email
                token: token,
                expires: addHours(new Date(), 1),  // Token expires in 1 hour
            },
        });

    } else {
        console.log('User no dey your db');
    }



    return true;
};