import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import Category from '../categoria/categoryModel.js';
import User from '../user/userModel.js';

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
  capa : {
    type : DataTypes.STRING,
    allowNull : true
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
      model: Category,
      key: "id",
    },
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
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

Workout.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Workout, { foreignKey: "created_by", as: "workoutsCreated" });

export default Workout;
