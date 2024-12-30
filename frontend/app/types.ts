// Define a type for chart data
export type ChartData = {
    value: number;
    label: string;
};

// Define a type for a single set
export type Set = {
    reps: number;
    weight: number;
};

// Define a type for an exercise
export type Exercise = {
    name: string;
    sets: Set[];
};

// Define a type for a workout
export type Workout = {
    date: string; // Format: 'MM/DD/YYYY'
    exercises: Exercise[];
};

const placeholder = {}; // Placeholder default export
export default placeholder;