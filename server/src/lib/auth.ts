import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { client } from './db.js';
import { sendMail } from './nodemailer.js';

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET as string,
    database: mongodbAdapter((await client()).db('personal-wallet'), {
        client: await client(),
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        createSessionOnSignUp: true,
        autoSignIn: true,
    },
    emailVerification: {
        sendOnSignUp: true,

        async sendVerificationEmail({ url, user }) {
            await sendMail({
                to: user.email,
                subject: 'Verify Your Email',
                body: `<h1>Hello</h1><p>Please verify your email: <a href="${url}">Click Here</a></p>`,
            });
        },
    },
    trustedOrigins: [process.env.FRONTEND_URL as string],
    cookie: {
        sameSite: 'lax',
        path: '/',
    },
});
