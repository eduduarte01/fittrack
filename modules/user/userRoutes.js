var express = require('express');
var router = express.Router();

const userController = require('./userController');

const authMiddleware = require('../../middlewares/auth');

const upload = require('../../middlewares/multer');

router.get('/', (req, res) => {
   res.render('pages/landing', {
      title: 'FitTrack'
   });
});

router.get('/register', (req, res) => {
   res.render('pages/register', {
      title: 'Cadastro - FitTrack'
   });
});

router.post('/register', userController.register);

router.get('/login', (req, res) => {
   res.render('pages/login', {
      title: 'Entrar - FitTrack'
   });
});

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/feed', authMiddleware, async (req, res) => {

   const user = await userController.getProfile(
      req.session.user.id
   );

   res.render('pages/home', {
      title: 'Home - FitTrack',
      user
   });
});

router.get('/profile/edit', authMiddleware, async (req, res) => {

   const user = await userController.getProfile(
      req.session.user.id
   );

   res.render('pages/edit-profile', {
      title: 'Editar Perfil - FitTrack',
      user
   });
});

router.post(
   '/profile/edit',
   authMiddleware,
   upload.single('profilePicture'),
   userController.updateProfile
);

module.exports = router;