var express = require("express");
var router = express.Router();
const workoutController = require("./workoutController");
const authMiddleware = require("../../middlewares/auth");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

router.post('/:id/delete', async(req,res) => {
    try{
        const { id } = req.params;

        await db.query('DELETE FROM workouts WHERE id = $1 AND user_id = $', [id,
            req.user.id
        ]);
        req.flash('succes', ('treino excluido.'));
        res.redirect('/feed');
    } catch(error){
        console.error(err);
        req.flash('error', 'erro ao exccluir treino.');
        res.redirect('/feed');
    }
});

const upload = multer ({storage : storage});


// Listar treinos
router.get("/feed", authMiddleware, workoutController.listWorkouts);

// Formulário de criação
router.get("/workouts/create", authMiddleware, workoutController.showCreateForm);

// Processar criação (CORRIGIDO para POST)
router.post("/workouts/create", authMiddleware, upload.single('capa'), workoutController.createWorkout);
// Detalhes de um treino específico (NOVO)
router.get("/workouts/:id", authMiddleware, workoutController.showWorkoutDetails);

router.post("/workouts/:id/delete", authMiddleware, workoutController.deleteWorkout);

module.exports = router;