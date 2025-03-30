// Define a type for chart data
export type ChartData = {
    value: number;
    label: string;
};

// Define a type for a single set
export type Set = {
    reps: number;
    weight: number;
    date: string;
};

export type Exercise = {
    id: string;
    name: string;
    sets: Set[];
    date: string;
};

// Define a type for a workout
export type Workout = {
    date: string; // Format: 'MM/DD/YYYY'
    exercises: Exercise[];
};

export type GenderOptions = 'Male' | 'Female' | '';
export type ActivityLevelOptions = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | '';
export type FitnessGoalOptions = 'Lose Weight' | 'Build Muscle' | 'Maintain Weight' | 'Increase Stamina' | 'Improve Flexibility' | 'Enhance Endurance' | '';

export type HeightValue = {
    feet: number;
    inches: number;
}

export type ProfileData = {
    name: string;
    age: string;
    weight: string;
    height: HeightValue;
    gender: GenderOptions;
    activityLevel: ActivityLevelOptions;
    fitnessGoal: FitnessGoalOptions;
}

const placeholder = {}; // placeholder default export
export default placeholder;