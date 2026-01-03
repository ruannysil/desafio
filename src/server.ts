import { app } from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Ocorreu um erro no servidor:", error);
  }
}

startServer();