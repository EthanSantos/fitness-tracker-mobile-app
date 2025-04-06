import { Set } from "../types";

// used to calculate one rep max based on reps and weight
export const calculateOneRepMax = (weight: number, reps: number): number => {
    if (reps <= 0) return weight;
    if (reps === 1) return weight;

    // Epley formula: weight * (1 + 0.0333 * reps)
    const epley = weight * (1 + 0.0333 * reps);

    // Brzycki formula: weight * 36 / (37 - reps)
    const brzycki = weight * 36 / (37 - reps);

    // Lander formula: 100 * weight / (101.3 - 2.67123 * reps)
    const lander = 100 * weight / (101.3 - 2.67123 * reps);

    // Average the formulas for better accuracy
    const average = (epley + brzycki + lander) / 3;

    // Round to nearest 0.5
    return Math.round(average * 2) / 2;
};

export const calculateAvgWeight = (sets: Set[]): string => {
    if (sets.length === 0) return "0";

    const totalWeight = sets.reduce((sum, set) => sum + set.weight, 0);
    return (totalWeight / sets.length).toFixed(1);
};