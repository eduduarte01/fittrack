const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = require('../user/userModel');
const Workout = require('../workout/workoutModel');

const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
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

User.hasMany(Rating, { foreignKey: 'user_id' });
Workout.hasMany(Rating, { foreignKey: 'workout_id' });

Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Workout, { foreignKey: 'workout_id' });

module.exports = Rating;