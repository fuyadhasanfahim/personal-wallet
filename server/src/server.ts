import 'dotenv/config';
import { createServer } from 'http';
import { connect } from 'mongoose';
import app from './app.js';

async function Server() {
    try {
        await connect(process.env.MONGO_URI as string);

        const server = createServer(app);

        server.listen(process.env.PORT ?? 5000, () => {
            console.log(
                `🚀 Server running on http://localhost:${
                    process.env.PORT ?? 5000
                }`
            );
        });
    } catch (error) {
        console.error(
            '🚫 Something went wrong connecting to the database:',
            error
        );
        process.exit(1);
    }
}

Server();
