import { MongoClient } from 'mongodb';
import 'dotenv/config';

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

export async function client(): Promise<MongoClient> {
    if (cachedClient) return cachedClient;

    if (!cachedPromise) {
        cachedPromise = new MongoClient(
            process.env.MONGO_URI as string
        ).connect();
    }

    cachedClient = await cachedPromise;
    console.log('🟢 MongoDB Client Connected');

    return cachedClient;
}
