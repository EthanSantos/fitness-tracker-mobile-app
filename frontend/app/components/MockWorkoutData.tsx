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
    {
        date: '12/23/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 185.0 }, { reps: 8, weight: 205.0 }] },
        ],
    },
    {
        date: '12/22/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 275.0 }, { reps: 8, weight: 315.0 }] },
        ],
    },
    {
        date: '12/21/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 335.0 }, { reps: 5, weight: 365.0 }] },
        ],
    },
    {
        date: '12/20/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 60.0 }, { reps: 8, weight: 65.0 }] },
        ],
    },
    {
        date: '12/19/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 200.0 }, { reps: 6, weight: 225.0 }] },
        ],
    },
    {
        date: '12/18/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 315.0 }, { reps: 6, weight: 335.0 }] },
        ],
    },
    {
        date: '12/17/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 345.0 }, { reps: 5, weight: 375.0 }] },
        ],
    },
    {
        date: '12/16/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 65.0 }, { reps: 6, weight: 70.0 }] },
        ],
    },
    {
        date: '12/15/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 195.0 }, { reps: 8, weight: 210.0 }] },
        ],
    },
    {
        date: '12/14/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 295.0 }, { reps: 8, weight: 325.0 }] },
        ],
    },
    {
        date: '12/13/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 355.0 }, { reps: 5, weight: 385.0 }] },
        ],
    },
    {
        date: '12/12/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 62.5 }, { reps: 8, weight: 67.5 }] },
        ],
    },
    {
        date: '12/11/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 205.0 }, { reps: 6, weight: 230.0 }] },
        ],
    },
    {
        date: '12/10/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 320.0 }, { reps: 6, weight: 345.0 }] },
        ],
    },
    {
        date: '12/09/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 365.0 }, { reps: 5, weight: 395.0 }] },
        ],
    },
    {
        date: '12/08/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 67.5 }, { reps: 6, weight: 70.0 }] },
        ],
    },
    {
        date: '12/07/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 200.0 }, { reps: 8, weight: 220.0 }] },
        ],
    },
    {
        date: '12/06/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 305.0 }, { reps: 8, weight: 330.0 }] },
        ],
    },
    {
        date: '12/05/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 370.0 }, { reps: 5, weight: 400.0 }] },
        ],
    },
    {
        date: '12/04/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 67.5 }, { reps: 6, weight: 72.5 }] },
        ],
    },
    // Week 5
    {
        date: '12/03/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 205.0 }, { reps: 6, weight: 225.0 }] },
        ],
    },
    {
        date: '12/02/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 320.0 }, { reps: 6, weight: 345.0 }] },
        ],
    },
    {
        date: '12/01/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 370.0 }, { reps: 5, weight: 400.0 }] },
        ],
    },
    {
        date: '11/30/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 67.5 }, { reps: 6, weight: 72.5 }] },
        ],
    },
    // Week 6
    {
        date: '11/29/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 195.0 }, { reps: 8, weight: 215.0 }] },
        ],
    },
    {
        date: '11/28/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 310.0 }, { reps: 8, weight: 335.0 }] },
        ],
    },
    {
        date: '11/27/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 375.0 }, { reps: 5, weight: 405.0 }] },
        ],
    },
    {
        date: '11/26/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 65.0 }, { reps: 8, weight: 72.5 }] },
        ],
    },
    // Week 7
    {
        date: '11/25/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 210.0 }, { reps: 6, weight: 230.0 }] },
        ],
    },
    {
        date: '11/24/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 325.0 }, { reps: 6, weight: 350.0 }] },
        ],
    },
    {
        date: '11/23/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 380.0 }, { reps: 5, weight: 405.0 }] },
        ],
    },
    {
        date: '11/22/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 70.0 }, { reps: 6, weight: 75.0 }] },
        ],
    },
];

export default workoutData;
