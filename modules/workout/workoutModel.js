const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Category = require("../categoria/categoryModel");
const User = require("../user/userModel"); // Importar o modelo User

const Workout = sequelize.define("Workout", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Referência direta ao modelo Category
      key: "id",
    },
  },
  created_by: { // Novo campo para o ID do usuário criador
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Referência direta ao modelo User
      key: "id",
    },
  },
});

Workout.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Category.hasMany(Workout, {
  foreignKey: "category_id",
  as: "workouts",
});

// Adicionar associação ao User model
Workout.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Workout, { foreignKey: "created_by", as: "workoutsCreated" });

module.exports = Workout;