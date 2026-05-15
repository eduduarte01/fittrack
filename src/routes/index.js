import express from 'express';
const router = express.Router();

// Rota para a página inicial (landing page)
router.get("/", function (req, res, next) {
  res.render("pages/landing", { title: "FitTrack" });
});

export default router;
