import 'dotenv/config';
import { Mongoose } from 'mongoose';
import { EnvVariableTypes } from 'types/database';

class Config {
    public static getEnv(key: EnvVariableTypes): string {
        const value = process.env[key];

        if (typeof value === 'string') {
            return value;
        }
        throw new Error(`Environment variable "${key}" is not a string.`);
    }

    public static transformMongooseResultingData(mongoose: Mongoose) {
        mongoose.set('toJSON', {
            virtuals: true,
            transform: (doc, converted) => {
                doc.id = converted._id;
                delete converted.__v;
                delete converted._id;
            },
        });
    }
}

export default Config;
