module.exports = (req, res, next) => {
    if (req.session.user){
        return next();
    }
    req.flash('error','Voce precisa estar logado para acessar esta pagina.');
    res.redirect('/login');
};