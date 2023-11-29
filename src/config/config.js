import dotenv from "dotenv";
dotenv.config();

const env = {
    userDb: process.env.userDb,
    passwordDb: process.env.passwordDb,
}

export default env
