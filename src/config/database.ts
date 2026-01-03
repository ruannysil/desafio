import mogoose from 'mongoose';

export async function connectDatabase() {
  try {
    await mogoose.connect(process.env.MONGO_URL);
    return console.log("Database connected");
  } catch (error) {
    console.error("Ocorreu um erro ao tentar conectar o db:", error);
  }
}