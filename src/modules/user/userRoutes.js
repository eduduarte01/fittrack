import express from 'express';
const router = express.Router();
import * as userController from './userController.js';
import authMiddleware from '../../middlewares/auth.js';
import upload from '../../middlewares/multer.js';
import Workout from '../workout/workoutModel.js';
import Category from '../categoria/categoryModel.js';

router.get("/register", (req, res) => {
   res.render("pages/register", {
      title: "Registro | FitTrack",
      messages: req.flash()
   });
});

router.post("/register", userController.register);

router.get("/login", (req, res) => {
   res.render("pages/login", {
      title: "Login | FitTrack",
      messages: req.flash()
   });
});

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userController.getProfile(req.session.user.id);
    res.render("pages/profile", {
      title: "Perfil | FitTrack",
      user,
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar perfil.");
    res.redirect("/feed");
  }
});

router.get("/profile/edit", authMiddleware, async (req, res) => {
  try {
    const user = await userController.getProfile(req.session.user.id);
    res.render("pages/edit-profile", {
      title: "Editar Perfil | FitTrack",
      user,
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar formulário de edição de perfil.");
    res.redirect("/feed");
  }
});

router.post("/profile/edit", authMiddleware, upload.single("profilePicture"), userController.updateProfile);

router.get("/feed", authMiddleware, async (req, res) => {
  try {
    const user = await userController.getProfile(req.session.user.id);
    const workouts = await Workout.findAll({ include: [{ model: Category, as: "category" }] });
    const categories = await Category.findAll();
    const selectedCategory = req.query.category || null;
    const q = req.query.q || "";

    let filteredWorkouts = workouts;
    if (selectedCategory) {
      filteredWorkouts = filteredWorkouts.filter(w => String(w.category_id) === String(selectedCategory));
    }
    if (q) {
      filteredWorkouts = filteredWorkouts.filter(w =>
        w.title.toLowerCase().includes(q.toLowerCase()) ||
        w.description.toLowerCase().includes(q.toLowerCase())
      );
    }

    res.render("pages/home", {
      title: "Home - FitTrack",
      user,
      workouts: filteredWorkouts,
      categories,
      recommendations: workouts.slice(0, 3),
      selectedCategory,
      q,
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar a página inicial.");
    res.redirect("/login");
  }
});

export default router;
