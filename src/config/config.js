import dotenv from 'dotenv';

dotenv.config();
const result = dotenv.config();

if (result.error) {
    console.error('Error al cargar el archivo .env:', result.error);
}

export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
  adminEmail: process.env.ADMIN_EMAIL,
  userNodemailer: process.env.USER_NODEMAILER,
  passNodemailer: process.env.PASS_NODEMAILER
}