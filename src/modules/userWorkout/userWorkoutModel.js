import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import User from '../user/userModel.js';
import Workout from '../workout/workoutModel.js';

const UserWorkout = sequelize.define("UserWorkout", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  workout_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workout,
      key: "id",
    },
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

UserWorkout.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserWorkout.belongsTo(Workout, { foreignKey: "workout_id", as: "workout" });

User.hasMany(UserWorkout, { foreignKey: "user_id", as: "userWorkouts" });
Workout.hasMany(UserWorkout, { foreignKey: "workout_id", as: "workoutUsers" });

export default UserWorkout;
