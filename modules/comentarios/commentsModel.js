const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("../user/userModel"); // Importar o modelo User
const Workout = require("../workout/workoutModel"); // Importar o modelo Workout

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Referência direta ao modelo User
      key: "id",
    },
  },
  workout_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workout, // Referência direta ao modelo Workout
      key: "id",
    },
  },
});

Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });
Comment.belongsTo(Workout, { foreignKey: "workout_id", as: "workout" });

User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
Workout.hasMany(Comment, { foreignKey: "workout_id", as: "comments" });

module.exports = Comment;