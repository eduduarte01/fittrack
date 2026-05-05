const User = require('./userModel');
const bcrypt = require('bcryptjs');

// Função de Cadastro
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword, fullName } = req.body;
    try {
        if (password !== confirmPassword) {
            req.flash('error', 'As senhas não coincidem.');
            return res.redirect('/register');
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            req.flash('error', 'Este e-mail já está cadastrado.');
            return res.redirect('/register');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        req.flash('success', 'Conta criada com sucesso!');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao criar conta.');
        res.redirect('/register');
    }
};

// Função de Login (Adicionada para resolver o erro "is not defined")
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            req.flash('error', 'Usuário não encontrado.');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Senha incorreta.');
            return res.redirect('/login');
        }

        // Aqui você configuraria a sessão futuramente
        res.redirect('/'); 
    } catch (error) {
        req.flash('error', 'Erro ao entrar.');
        res.redirect('/login');
    }
};