/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, { Mongoose } from 'mongoose';
import { IDatabase } from 'types/database';
import Config from 'utils/config';

class MongoDb implements IDatabase {
    private static instance: MongoDb | null = null;
    private connection: Mongoose | null = null;

    private constructor() {}

    public static getInstance(): MongoDb {
        if (!this.instance) {
            this.instance = new MongoDb();
        }
        return this.instance;
    }

    public async connect(): Promise<void> {
        // mongoose.deleteModel('Attachment');
        // delete mongoose.models.Task;
        if (!this.connection) {
            try {
                this.connection = await mongoose.connect(
                    Config.getEnv('DATABASE_URL'),
                );
                console.log('Connected to the database');
            } catch (error) {
                console.error(`Database connection error: ${error}`);
            }
        }
    }

    public getConnection(): Mongoose | null {
        return this.connection;
    }
}

export default MongoDb;
