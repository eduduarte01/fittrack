const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = require('../user/userModel');
const Workout = require('../workout/workoutModel');

const UserWorkout = sequelize.define('UserWorkout', {
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
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

User.belongsToMany(Workout, {
    through: UserWorkout,
    foreignKey: 'user_id',
    otherKey: 'workout_id'
});

Workout.belongsToMany(User, {
    through: UserWorkout,
    foreignKey: 'workout_id',
    otherKey: 'user_id'
});

module.exports = UserWorkout;