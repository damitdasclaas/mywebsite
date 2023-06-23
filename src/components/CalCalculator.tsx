import React, { useState } from 'react';

const CalorieCalculator: React.FC = () => {
    const [age, setAge] = useState<string>('');
    const [userWeight, setUserWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [activityLevel, setActivityLevel] = useState<string>('sedentary');
    const [calorieIntake, setCalorieIntake] = useState<number>(0);
    const [bmr1, setBmr1] = useState<number>(0);
    const [bmr2, setBmr2] = useState<number>(0);
    const [avg_bmr, setAvgBmr] = useState<number>(0);
    const [modDeficit, setModDeficit] = useState<number>(0);
    const [aggDeficit, setAggDeficit] = useState<number>(0);

    const calculateCalorieIntake = (): void => {
        // Constants for calorie calculation
        const WEIGHT_FACTOR_BMR1: number = 10;
        const HEIGHT_FACTOR_BMR1: number = 6.25;
        const AGE_FACTOR_BMR1: number = 5;
        const BMR2_CONSTANT: number = 88.362;
        const WEIGHT_FACTOR_BMR2: number = 13.397;
        const HEIGHT_FACTOR_BMR2: number = 4.799;
        const AGE_FACTOR_BMR2: number = 5.677;
        const MODERATE_DEFICIT_FACTOR: number = 0.8;
        const AGGRESSIVE_DEFICIT_FACTOR: number = 0.7;

        // Convert input values to numbers
        const ageNum: number = Number(age);
        const weightNum: number = Number(userWeight);
        const heightNum: number = Number(height);

        // Calculate BMR based on gender
        const bmr1: number = (WEIGHT_FACTOR_BMR1 * weightNum) + (HEIGHT_FACTOR_BMR1 * heightNum) - (AGE_FACTOR_BMR1 * ageNum) + AGE_FACTOR_BMR1;
        const bmr2: number = BMR2_CONSTANT + (WEIGHT_FACTOR_BMR2 * weightNum) + (HEIGHT_FACTOR_BMR2 * heightNum) - (AGE_FACTOR_BMR2 * ageNum);
        const avg_bmr: number = (bmr1 + bmr2) / 2;

        // Calculate calorie intake based on activity level
        let calorieIntake: number;
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
        setBmr1(bmr1);
        setBmr2(bmr2);
        setAvgBmr(avg_bmr);
        setModDeficit(MODERATE_DEFICIT_FACTOR);
        setAggDeficit(AGGRESSIVE_DEFICIT_FACTOR);
    };

    return (
        <div>
            <h2>Male Calorie Calculator</h2>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                />
            </div>
            <div>
                <label>Weight (in kg):</label>
                <input
                    type="number"
                    value={userWeight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserWeight(e.target.value)}
                />
            </div>
            <div>
                <label>Height (in cm):</label>
                <input
                    type="number"
                    value={height}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeight(e.target.value)}
                />
            </div>
            <div>
                <label>Activity Level:</label>
                <select value={activityLevel} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setActivityLevel(e.target.value)}>
                    <option value="sedentary">Sedentary (1.2)</option>
                    <option value="lightlyActive">Lightly Active (1.375)</option>
                    <option value="moderatelyActive">Moderately Active (1.55)</option>
                    <option value="veryActive">Very Active (1.725)</option>
                    <option value="extraActive">Extra Active (1.9)</option>
                </select>
            </div>
            <button onClick={calculateCalorieIntake}>Calculate</button>
            <div>
                <h3>BMR 1: {bmr1} calories</h3>
                <h3>BMR 2: {bmr2} calories</h3>
                <h3>Average BMR: {avg_bmr} calories</h3>
                <h3>TDEE: {calorieIntake} calories</h3>

                <h3>Calorie Intake moderate Deficit: {calorieIntake * modDeficit} calories</h3>
                <h3>Calorie Intake aggressive Deficit: {calorieIntake * aggDeficit} calories</h3>
            </div>
        </div>
    );
};

export default CalorieCalculator;
