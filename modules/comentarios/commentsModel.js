const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = require('../user/userModel');
const Workout = require('../workout/workoutModel');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    workout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Workouts',
            key: 'id'
        }
    }
});

User.hasMany(Comment, { foreignKey: 'user_id' });
Workout.hasMany(Comment, { foreignKey: 'workout_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Workout, { foreignKey: 'workout_id' });

module.exports = Comment;