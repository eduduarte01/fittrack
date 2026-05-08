var express = require("express");
var router = express.Router();
const userController = require("./userController");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/multer"); // CORRIGIDO: Usar 'multer' em vez de 'upload'
const Workout = require("../workout/workoutModel"); // CORRIGIDO: Importar modelo de treino
const Category = require("../categoria/categoryModel"); // CORRIGIDO: Importar modelo de categoria

router.get("/", (req, res) => {
   res.render("pages/landing", {
      title: "FitTrack"
   });
});

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
      workouts: filteredWorkouts, // Passar treinos filtrados
      categories, // Passar categorias
      recommendations: workouts.slice(0, 3), // Exemplo: primeiras 3 como recomendação
      selectedCategory, // Passar categoria selecionada
      q, // Passar termo de busca
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar a página inicial.");
    res.redirect("/login");
  }
});

module.exports = router;
