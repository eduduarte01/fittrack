const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("../user/userModel"); // Importar o modelo User
const Workout = require("../workout/workoutModel"); // Importar o modelo Workout

const UserWorkout = sequelize.define("UserWorkout", {
  id: { // Adicionado campo ID como chave primária
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true, // Permitir que seja nulo inicialmente
  },
});

// Associações diretas para UserWorkout
UserWorkout.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserWorkout.belongsTo(Workout, { foreignKey: "workout_id", as: "workout" });

// Associações inversas (se necessário, podem ser definidas nos modelos User e Workout)
User.hasMany(UserWorkout, { foreignKey: "user_id", as: "userWorkouts" });
Workout.hasMany(UserWorkout, { foreignKey: "workout_id", as: "workoutUsers" });

module.exports = UserWorkout;