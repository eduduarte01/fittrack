const {Op} = require("sequelize");
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

exports.register = async (req, res) => {
    const { username, email, password, confirmPassword, fullName } = req.body;
    try {
        if (password !== confirmPassword) {
            req.flash("error", "As senhas não coincidem.");
            return res.redirect("/register");
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            req.flash("error", "Este e-mail já está cadastrado.");
            return res.redirect("/register");
        }

        // Adicionar verificação de username duplicado
        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
            req.flash("error", "Este nome de usuário já está em uso.");
            return res.redirect("/register");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        req.flash("success", "Conta criada com sucesso!");
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        req.flash("error", "Erro ao criar conta.");
        res.redirect("/register");
    }
};

exports.login = async (req, res) => {
    try {
        const {login, password} = req.body;

        const user = await User.findOne({
            where : {
                [Op.or] : [{email:login}, {username :login}]
            }
        });
        // Adicionar verificação de isBlocked
        if(!user || !(await bcrypt.compare(password, user.password)) || user.isBlocked){
            req.flash("error", "E-mail/Usuário ou senha incorretos ou usuário bloqueado.");
            return res.redirect("/login");
        }

        const userData = await exports.getProfile(user.id);
        req.session.user = userData;

        res.redirect("/feed");
    } catch (error){
        console.error("erro real aqui :", error);
        req.flash("error", "Ocorreu um erro ao tentar entrar.");
        res.redirect("/login");
    }
};

exports.logout = (req, res)=>{
    req.session.destroy(() =>{
        res.redirect("/");
    });
};

exports.getProfile = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            attributes : ["id", "username", "email", "fullName", "bio", "profilePicture"]
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar perfil do usuário");
    }
};

exports.updateProfile = async (req,res) => {
    try {
        const {fullName, bio, username} = req.body; // Capturar username
        const userId = req.session.user.id;

        const updateData = {fullName, bio};

        if(username) {
            // Verificar se o novo username já existe e não pertence ao usuário atual
            const existingUserWithUsername = await User.findOne({ where: { username, id: { [Op.ne]: userId } } });
            if (existingUserWithUsername) {
                req.flash("error", "Este nome de usuário já está em uso por outro usuário.");
                return res.redirect("/profile/edit");
            }
            updateData.username = username;
        }

        if(req.file) {
            updateData.profilePicture = req.file.filename;
        }

        const oldUser = await User.findByPk(userId);

        await User.update(updateData, {where: { id: userId } });

        if(req.file && oldUser.profilePicture && oldUser.profilePicture !== "default-profile.png"){
            const oldProfilePicPath = path.join(__dirname, "../../public/uploads/profiles", oldUser.profilePicture);
            fs.unlink(oldProfilePicPath, (err) => {
                if(err) console.error("Erro ao apagar a foto de perfil antiga:",err);
                else console.log("Foto de perfil antiga apagada:", oldProfilePicPath);
            });
        }

        const userData = await exports.getProfile(userId);
        req.session.user = userData;

        req.flash("success", "Perfil atualizado com sucesso!");
        res.redirect("/profile/edit");
    }catch(error) {
        console.error(error);
        req.flash("error", "Erro ao atualizar perfil.");
        res.redirect("/profile/edit");
    }
};