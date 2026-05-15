import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import User from '../user/userModel.js';
import Workout from '../workout/workoutModel.js';

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
});

Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });
Comment.belongsTo(Workout, { foreignKey: "workout_id", as: "workout" });

User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
Workout.hasMany(Comment, { foreignKey: "workout_id", as: "comments" });

export default Comment;
