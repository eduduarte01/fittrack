import express from 'express';
const router = express.Router();
import * as workoutController from './workoutController.js';
import authMiddleware from '../../middlewares/auth.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'src/public/uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer ({storage : storage});

// Listar treinos
router.get("/feed", authMiddleware, workoutController.listWorkouts);

// Formulário de criação
router.get("/workouts/create", authMiddleware, workoutController.showCreateForm);

// Processar criação
router.post("/workouts/create", authMiddleware, upload.single('capa'), workoutController.createWorkout);

// Detalhes de um treino específico
router.get("/workouts/:id", authMiddleware, workoutController.showWorkoutDetails);

router.post("/workouts/:id/delete", authMiddleware, workoutController.deleteWorkout);

export default router;
