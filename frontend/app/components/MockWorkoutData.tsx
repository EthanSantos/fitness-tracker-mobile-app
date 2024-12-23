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
        date: '12/20/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 90.0 }, { reps: 8, weight: 110.0 }] },
        ],
    },
    {
        date: '12/21/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 80.0 }, { reps: 8, weight: 100.0 }] },
        ],
    },
    {
        date: '12/22/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 5, weight: 120.0 }, { reps: 4, weight: 140.0 }] },
        ],
    },
    {
        date: '12/23/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 40.0 }, { reps: 8, weight: 50.0 }] },
        ],
    },
    {
        date: '12/24/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 100.0 }, { reps: 6, weight: 120.0 }] },
        ],
    },
    {
        date: '12/25/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 90.0 }, { reps: 6, weight: 110.0 }] },
        ],
    },
    {
        date: '12/26/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 5, weight: 130.0 }, { reps: 4, weight: 150.0 }] },
        ],
    },
    {
        date: '12/27/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 45.0 }, { reps: 6, weight: 55.0 }] },
        ],
    },
    {
        date: '12/28/2024',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 95.0 }, { reps: 8, weight: 115.0 }] },
        ],
    },
    {
        date: '12/29/2024',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 85.0 }, { reps: 8, weight: 105.0 }] },
        ],
    },
    {
        date: '12/30/2024',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 125.0 }, { reps: 4, weight: 145.0 }] },
        ],
    },
    {
        date: '12/31/2024',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 10, weight: 42.5 }, { reps: 8, weight: 52.5 }] },
        ],
    },
    {
        date: '01/01/2025',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 8, weight: 105.0 }, { reps: 6, weight: 125.0 }] },
        ],
    },
    {
        date: '01/02/2025',
        exercises: [
            { name: 'Squat', sets: [{ reps: 8, weight: 95.0 }, { reps: 6, weight: 115.0 }] },
        ],
    },
    {
        date: '01/03/2025',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 135.0 }, { reps: 4, weight: 155.0 }] },
        ],
    },
    {
        date: '01/04/2025',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 50.0 }, { reps: 6, weight: 60.0 }] },
        ],
    },
    {
        date: '01/05/2025',
        exercises: [
            { name: 'Bench Press', sets: [{ reps: 10, weight: 100.0 }, { reps: 8, weight: 120.0 }] },
        ],
    },
    {
        date: '01/06/2025',
        exercises: [
            { name: 'Squat', sets: [{ reps: 10, weight: 90.0 }, { reps: 8, weight: 110.0 }] },
        ],
    },
    {
        date: '01/07/2025',
        exercises: [
            { name: 'Deadlift', sets: [{ reps: 6, weight: 140.0 }, { reps: 4, weight: 160.0 }] },
        ],
    },
    {
        date: '01/08/2025',
        exercises: [
            { name: 'Shoulder Press', sets: [{ reps: 8, weight: 55.0 }, { reps: 6, weight: 65.0 }] },
        ],
    },
];

export default workoutData