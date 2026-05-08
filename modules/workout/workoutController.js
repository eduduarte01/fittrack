const Workout = require("./workoutModel");
const Category = require("../categoria/categoryModel"); // CORRIGIDO: Importar o modelo Category
const User = require("../user/userModel"); // Necessário para a associação created_by

exports.showCreateForm = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Variável corrigida para minúsculo
    res.render("pages/create-workout", {
      title: "Criar Treino | FitTrack",
      categories, // Passando a variável corrigida
      messages: req.flash(), // Garantir que as mensagens flash sejam passadas
      user: req.session.user || null, // Garantir que o usuário esteja disponível
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar formulário.");
    res.redirect("/feed");
  }
};

exports.createWorkout = async (req, res) => {
  try {
    const { title, description, video_url, category_id } = req.body;
    const userId = req.session.user.id; // Obter ID do usuário da sessão

    await Workout.create({
      title,
      description,
      video_url,
      category_id,
      created_by: userId, // Associar o treino ao usuário logado
    });

    req.flash("success", "Treino criado com sucesso!");
    res.redirect("/workouts"); // Redirecionar para a lista de treinos
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao criar treino.");
    res.redirect("/workouts/create");
  }
};

exports.listWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll({
      include: [{ model: Category, as: "category" }],
    });

    res.render("pages/workouts", {
      title: "Treinos | FitTrack",
      workouts, // Passando a variável workouts para a view
      messages: req.flash(),
      user: req.session.user || null,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar treinos.");
    res.redirect("/feed");
  }
};

exports.showWorkoutDetails = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    if (!workout) {
      req.flash("error", "Treino não encontrado.");
      return res.redirect("/workouts");
    }

    res.render("pages/workout-details", {
      title: workout.title,
      workout,
      messages: req.flash(),
      user: req.session.user || null,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao carregar detalhes do treino.");
    res.redirect("/workouts");
  }
};
