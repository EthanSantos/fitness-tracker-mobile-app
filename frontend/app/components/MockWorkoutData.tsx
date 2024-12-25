type Set = {
    reps: number;
    weight: number;
};

type Exercise = {
    name: string;
    sets: Set[];
};

type Workout = {
    date: string; // Format: 'MM/DD/YYYY'
    exercises: Exercise[];
};

export const workoutData: Workout[] = [
    // Week 1
    {
        date: '12/23/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 185.0 }, { reps: 8, weight: 195.0 }] },
        ],
    },
    {
        date: '12/22/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 275.0 }, { reps: 8, weight: 295.0 }] },
        ],
    },
    {
        date: '12/21/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 335.0 }, { reps: 5, weight: 355.0 }] },
        ],
    },
    {
        date: '12/20/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 60.0 }, { reps: 8, weight: 62.5 }] },
        ],
    },
    // Week 2
    {
        date: '12/19/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 190.0 }, { reps: 6, weight: 200.0 }] },
        ],
    },
    {
        date: '12/18/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 285.0 }, { reps: 6, weight: 305.0 }] },
        ],
    },
    {
        date: '12/17/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 345.0 }, { reps: 5, weight: 365.0 }] },
        ],
    },
    {
        date: '12/16/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 62.5 }, { reps: 6, weight: 65.0 }] },
        ],
    },
    // Week 3
    {
        date: '12/15/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 195.0 }, { reps: 8, weight: 205.0 }] },
        ],
    },
    {
        date: '12/14/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 300.0 }, { reps: 8, weight: 320.0 }] },
        ],
    },
    {
        date: '12/13/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 360.0 }, { reps: 5, weight: 380.0 }] },
        ],
    },
    {
        date: '12/12/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 65.0 }, { reps: 8, weight: 67.5 }] },
        ],
    },
    // Week 4
    {
        date: '12/11/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 200.0 }, { reps: 6, weight: 215.0 }] },
        ],
    },
    {
        date: '12/10/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 310.0 }, { reps: 6, weight: 330.0 }] },
        ],
    },
    {
        date: '12/09/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 370.0 }, { reps: 5, weight: 390.0 }] },
        ],
    },
    {
        date: '12/08/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 67.5 }, { reps: 6, weight: 70.0 }] },
        ],
    },
    // Week 5
    {
        date: '12/07/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 205.0 }, { reps: 8, weight: 220.0 }] },
        ],
    },
    {
        date: '12/06/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 325.0 }, { reps: 8, weight: 345.0 }] },
        ],
    },
    {
        date: '12/05/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 380.0 }, { reps: 5, weight: 405.0 }] },
        ],
    },
    {
        date: '12/04/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 70.0 }, { reps: 6, weight: 72.5 }] },
        ],
    },
    // Week 6
    {
        date: '12/03/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 215.0 }, { reps: 6, weight: 230.0 }] },
        ],
    },
    {
        date: '12/02/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 335.0 }, { reps: 6, weight: 355.0 }] },
        ],
    },
    {
        date: '12/01/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 390.0 }, { reps: 5, weight: 415.0 }] },
        ],
    },
    {
        date: '11/30/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 72.5 }, { reps: 6, weight: 75.0 }] },
        ],
    },
];

export default workoutData;
