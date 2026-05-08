var express = require("express");
var router = express.Router();
const workoutController = require("./workoutController");
const authMiddleware = require("../../middlewares/auth");

// Listar treinos
router.get("/workouts", authMiddleware, workoutController.listWorkouts);

// Formulário de criação
router.get("/workouts/create", authMiddleware, workoutController.showCreateForm);

// Processar criação (CORRIGIDO para POST)
router.post("/workouts/create", authMiddleware, workoutController.createWorkout);

// Detalhes de um treino específico (NOVO)
router.get("/workouts/:id", authMiddleware, workoutController.showWorkoutDetails);

module.exports = router;