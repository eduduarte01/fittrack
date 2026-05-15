import 'dotenv/config';
import app from './app.js';
import sequelize from './config/database.js';

// Importar modelos para garantir que sejam registrados antes da sincronização
import './modules/user/userModel.js';
import './modules/categoria/categoryModel.js';
import './modules/workout/workoutModel.js';
import './modules/comentarios/commentsModel.js';
import './modules/userWorkout/userWorkoutModel.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    
    // Sincronizar o banco de dados
    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ou sincronizar o banco de dados:", err);
    process.exit(1);
  }
}

startServer();
