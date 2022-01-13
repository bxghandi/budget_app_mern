import * as dotenv from 'dotenv';

dotenv.config();

export const local_mongoURI = process.env.LOCAL_MONGOURI as string;
export const remote_mongoURI = process.env.REMOTE_MONGOURI as string;
