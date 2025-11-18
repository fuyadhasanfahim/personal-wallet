import { createTransport, type Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter() {
    if (!transporter) {
        transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true' || true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    return transporter;
}

export async function verifyEmailConnection() {
    try {
        const t = getTransporter();
        await t.verify();
        console.log('SMTP connection verified');
    } catch (err) {
        console.error('SMTP connection failed:', err);
    }
}

export interface SendMailOptions {
    to: string;
    subject: string;
    body: string;
    fromName?: string;
    fromEmail?: string;
}

export async function sendMail({
    to,
    subject,
    body,
    fromName = 'Personal Finance',
    fromEmail = process.env.SMTP_USER,
}: SendMailOptions) {
    const t = getTransporter();

    const mailOptions = {
        from: `"${fromName}" <${fromEmail}>`,
        to,
        subject,
        html: body,
    };

    const maxRetries = 2;
    let attempt = 0;

    while (true) {
        try {
            await t.sendMail(mailOptions);
            return;
        } catch (err) {
            attempt++;
            if (attempt > maxRetries) {
                console.error('Email sending failed permanently:', err);
                throw err;
            }
            await new Promise((res) => setTimeout(res, attempt * 500));
        }
    }
}
