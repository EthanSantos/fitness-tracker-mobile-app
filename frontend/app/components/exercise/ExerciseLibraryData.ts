export type ExerciseData = {
    id: string;
    exercise_name: string;
    muscle_groups: string;
}

export const exerciseLibraryData: ExerciseData[] = [
    // Chest
    {
        id: '1',
        exercise_name: 'Bench Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '2',
        exercise_name: 'Incline Bench Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '3',
        exercise_name: 'Dumbbell Bench Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '4',
        exercise_name: 'Dumbbell Fly',
        muscle_groups: 'Chest',
    },
    {
        id: '5',
        exercise_name: 'Incline Dumbbell Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '6',
        exercise_name: 'Push-Up',
        muscle_groups: 'Chest, Triceps, Shoulders',
    },
    {
        id: '7',
        exercise_name: 'Cable Fly',
        muscle_groups: 'Chest',
    },
    {
        id: '8',
        exercise_name: 'Incline Cable Fly',
        muscle_groups: 'Chest',
    },
    {
        id: '9',
        exercise_name: 'Decline Cable Fly',
        muscle_groups: 'Chest',
    },
    
    // Back
    {
        id: '10',
        exercise_name: 'Pull-up',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '11',
        exercise_name: 'Lat Pulldown',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '12',
        exercise_name: 'Barbell Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '13',
        exercise_name: 'Dumbbell Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '14',
        exercise_name: 'T-Bar Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '15',
        exercise_name: 'Seated Cable Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '16',
        exercise_name: 'Dumbbell Shrug',
        muscle_groups: 'Back, Shoulders',
    },
    
    // Legs
    {
        id: '17',
        exercise_name: 'Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '18',
        exercise_name: 'Deadlift',
        muscle_groups: 'Back, Legs',
    },
    {
        id: '19',
        exercise_name: 'Leg Press',
        muscle_groups: 'Legs',
    },
    {
        id: '20',
        exercise_name: 'Lunges',
        muscle_groups: 'Legs',
    },
    {
        id: '21',
        exercise_name: 'Dumbbell Lunges',
        muscle_groups: 'Legs',
    },
    {
        id: '22',
        exercise_name: 'Leg Extension',
        muscle_groups: 'Legs',
    },
    {
        id: '23',
        exercise_name: 'Leg Curl',
        muscle_groups: 'Legs',
    },
    {
        id: '24',
        exercise_name: 'Calf Raise',
        muscle_groups: 'Legs',
    },
    
    // Shoulders
    {
        id: '25',
        exercise_name: 'Overhead Press',
        muscle_groups: 'Shoulders, Triceps',
    },
    {
        id: '26',
        exercise_name: 'Dumbbell Shoulder Press',
        muscle_groups: 'Shoulders, Triceps',
    },
    {
        id: '27',
        exercise_name: 'Lateral Raise',
        muscle_groups: 'Shoulders',
    },
    {
        id: '28',
        exercise_name: 'Front Raise',
        muscle_groups: 'Shoulders',
    },
    {
        id: '29',
        exercise_name: 'Reverse Fly',
        muscle_groups: 'Shoulders, Back',
    },
    {
        id: '30',
        exercise_name: 'Face Pull',
        muscle_groups: 'Shoulders, Back',
    },
    {
        id: '31',
        exercise_name: 'Arnold Press',
        muscle_groups: 'Shoulders, Triceps',
    },
    
    // Biceps
    {
        id: '32',
        exercise_name: 'Bicep Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '33',
        exercise_name: 'Hammer Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '34',
        exercise_name: 'Dumbbell Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '35',
        exercise_name: 'Concentration Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '36',
        exercise_name: 'Preacher Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '37',
        exercise_name: 'Incline Dumbbell Curl',
        muscle_groups: 'Biceps',
    },
    
    // Triceps
    {
        id: '38',
        exercise_name: 'Tricep Extension',
        muscle_groups: 'Triceps',
    },
    {
        id: '39',
        exercise_name: 'Skull Crushers',
        muscle_groups: 'Triceps',
    },
    {
        id: '40',
        exercise_name: 'Dumbbell Tricep Extension',
        muscle_groups: 'Triceps',
    },
    {
        id: '41',
        exercise_name: 'Tricep Pushdown',
        muscle_groups: 'Triceps',
    },
    {
        id: '42',
        exercise_name: 'Close-Grip Bench Press',
        muscle_groups: 'Triceps, Chest',
    },
    {
        id: '43',
        exercise_name: 'Dips',
        muscle_groups: 'Triceps, Chest',
    },
    
    // Core
    {
        id: '44',
        exercise_name: 'Plank',
        muscle_groups: 'Core',
    },
    {
        id: '45',
        exercise_name: 'Crunches',
        muscle_groups: 'Core',
    },
    {
        id: '46',
        exercise_name: 'Russian Twist',
        muscle_groups: 'Core',
    },
    {
        id: '47',
        exercise_name: 'Leg Raise',
        muscle_groups: 'Core',
    },
    {
        id: '48',
        exercise_name: 'Decline Sit-up',
        muscle_groups: 'Core',
    },
    {
        id: '49',
        exercise_name: 'Ab Rollout',
        muscle_groups: 'Core',
    },
    {
        id: '50',
        exercise_name: 'Pendulum Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '51',
        exercise_name: 'Meadows Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '52',
        exercise_name: 'Hack Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '53',
        exercise_name: 'Sissy Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '54',
        exercise_name: 'Bulgarian Split Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '55',
        exercise_name: 'Chest-Supported Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '56',
        exercise_name: 'Incline Smith Machine Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '57',
        exercise_name: 'Landmine Press',
        muscle_groups: 'Shoulders, Chest',
    },
    {
        id: '58',
        exercise_name: 'Pullovers',
        muscle_groups: 'Back, Chest',
    },
    {
        id: '59',
        exercise_name: 'Viking Press',
        muscle_groups: 'Shoulders, Triceps',
    },
    {
        id: '60',
        exercise_name: 'Belt Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '61',
        exercise_name: 'Cross-Body Hammer Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '62',
        exercise_name: 'Rack Pulls',
        muscle_groups: 'Back, Legs',
    },
    {
        id: '63',
        exercise_name: 'Cable Pullthrough',
        muscle_groups: 'Legs, Back',
    },
    {
        id: '64',
        exercise_name: 'Adductor Machine',
        muscle_groups: 'Legs',
    },
    {
        id: '65',
        exercise_name: 'Reverse Pec Deck',
        muscle_groups: 'Shoulders, Back',
    },
    {
        id: '66',
        exercise_name: 'Decline Bench Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '67',
        exercise_name: 'Smith Machine Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '68',
        exercise_name: 'Smith Machine Calf Raise',
        muscle_groups: 'Legs',
    },
    {
        id: '69',
        exercise_name: 'Machine Chest Press',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '70',
        exercise_name: 'Kneeling Cable Crunch',
        muscle_groups: 'Core',
    },
    {
        id: '71',
        exercise_name: 'Hanging Leg Raise',
        muscle_groups: 'Core',
    },
    {
        id: '72',
        exercise_name: 'Decline Cable Pullover',
        muscle_groups: 'Back, Chest',
    },
    {
        id: '73',
        exercise_name: 'Dumbbell Pullover',
        muscle_groups: 'Back, Chest',
    },
    {
        id: '74',
        exercise_name: 'Z-Press',
        muscle_groups: 'Shoulders, Triceps',
    },
    {
        id: '75',
        exercise_name: 'Single-Arm Dumbbell Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '76',
        exercise_name: 'Decline Push-Up',
        muscle_groups: 'Chest, Triceps',
    },
    {
        id: '77',
        exercise_name: 'Incline Push-Up',
        muscle_groups: 'Chest, Triceps, Shoulders',
    },
    {
        id: '78',
        exercise_name: 'Straight Arm Pulldown',
        muscle_groups: 'Back',
    },
    {
        id: '79',
        exercise_name: 'Standing Cable Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '80',
        exercise_name: 'Goblet Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '81',
        exercise_name: 'Cable Lateral Raise',
        muscle_groups: 'Shoulders',
    },
    {
        id: '82',
        exercise_name: 'Banded Pull-Apart',
        muscle_groups: 'Shoulders, Back',
    },
    {
        id: '83',
        exercise_name: 'Barbell Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '84',
        exercise_name: 'Decline Skull Crusher',
        muscle_groups: 'Triceps',
    },
    {
        id: '85',
        exercise_name: 'JM Press',
        muscle_groups: 'Triceps',
    },
    {
        id: '86',
        exercise_name: 'Spider Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '87',
        exercise_name: 'Bayesian Curl',
        muscle_groups: 'Biceps',
    },
    {
        id: '88',
        exercise_name: 'Sissy Hack Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '89',
        exercise_name: 'Toes-to-Bar',
        muscle_groups: 'Core',
    },
    {
        id: '90',
        exercise_name: 'L-Sit',
        muscle_groups: 'Core',
    },
    {
        id: '91',
        exercise_name: 'Cable Crunch',
        muscle_groups: 'Core',
    },
    {
        id: '92',
        exercise_name: 'Seal Row',
        muscle_groups: 'Back, Biceps',
    },
    {
        id: '93',
        exercise_name: 'Staggered Stance Smith Machine Squat',
        muscle_groups: 'Legs',
    },
    {
        id: '94',
        exercise_name: 'Belt Squat March',
        muscle_groups: 'Legs',
    },
    {
        id: '95',
        exercise_name: 'Lying Tricep Extension',
        muscle_groups: 'Triceps',
    }
];