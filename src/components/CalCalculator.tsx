import React, { useState } from 'react';

const CalorieCalculator = () => {
    const [age, setAge] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [calorieIntake, setCalorieIntake] = useState(0);
    const [avg_bmr, setBmr] = useState(0);

    const calculateCalorieIntake = () => {
        // Constants for calorie calculation
        const WEIGHT_FACTOR_BMR1 = 10;
        const HEIGHT_FACTOR_BMR1 = 6.25;
        const AGE_FACTOR_BMR1 = 5;
        const BMR2_CONSTANT = 88.362;
        const WEIGHT_FACTOR_BMR2 = 13.397;
        const HEIGHT_FACTOR_BMR2 = 4.799;
        const AGE_FACTOR_BMR2 = 5.677;

        // Convert input values to numbers
        const ageNum = Number(age);
        const weightNum = Number(userWeight);
        const heightNum = Number(height);

        // Calculate BMR based on gender
        const bmr1 = (WEIGHT_FACTOR_BMR1 * weightNum) + (HEIGHT_FACTOR_BMR1 * heightNum) - (AGE_FACTOR_BMR1 * ageNum) + AGE_FACTOR_BMR1;
        const bmr2 = BMR2_CONSTANT + (WEIGHT_FACTOR_BMR2 * weightNum) + (HEIGHT_FACTOR_BMR2 * heightNum) - (AGE_FACTOR_BMR2 * ageNum);
        const avg_bmr = (bmr1 + bmr2) / 2;

        // Calculate calorie intake based on activity level
        let calorieIntake;
        switch (activityLevel) {
            case 'sedentary':
                calorieIntake = avg_bmr * 1.2;
                break;
            case 'lightlyActive':
                calorieIntake = avg_bmr * 1.375;
                break;
            case 'moderatelyActive':
                calorieIntake = avg_bmr * 1.55;
                break;
            case 'veryActive':
                calorieIntake = avg_bmr * 1.725;
                break;
            case 'extraActive':
                calorieIntake = avg_bmr * 1.9;
                break;
            default:
                calorieIntake = 0;
        }

        // Set the calculated calorie intake
        setCalorieIntake(calorieIntake);
        setBmr(avg_bmr);
    };

    return (
        <div>
            <h2>Male Calorie Calculator</h2>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div>
                <label>Weight (in kg):</label>
                <input
                    type="number"
                    value={userWeight}
                    onChange={(e) => setUserWeight(e.target.value)}
                />
            </div>
            <div>
                <label>Height (in cm):</label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div>
                <label>Activity Level:</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightlyActive">Lightly Active</option>
                    <option value="moderatelyActive">Moderately Active</option>
                    <option value="veryActive">Very Active</option>
                    <option value="extraActive">Extra Active</option>
                </select>
            </div>
            <button onClick={calculateCalorieIntake}>Calculate</button>
            <div>
                <h3>Average BMR: {avg_bmr} calories</h3>
                <h3>Calorie Intake: {calorieIntake} calories</h3>
            </div>
        </div>
    );
};

export default CalorieCalculator;
