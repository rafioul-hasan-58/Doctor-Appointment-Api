import app from "./app";
import mongoose from "mongoose";
import { Server } from 'http'
import config from "./app/config";

let server: Server;

async function main() {

    try {
        await mongoose.connect(config.database_url as string);
          console.log('🟢 MongoDB connected successfully');
        server = app.listen(config.port, () => {
            console.log(`🚑 API is healthy and running on port ${config.port}`)
        })
    }
    catch (err) {
        console.error('❌ Failed to connect to MongoDB or start server:', err);
    }
}

main()

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
