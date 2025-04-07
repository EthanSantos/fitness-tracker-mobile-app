import { Workout } from "../../types";

export const workoutData: { workouts: Workout[] } = {
  workouts: [
    // Week 1
    {
      id: "1712102400000", // Apr 4, 2025 timestamp
      name: "Push Day",
      date: '4/4/2025',
      exercises: [
        { 
          id: "ex1",
          name: 'Bench Press', 
          date: '4/4/2025',
          sets: [
            { reps: 10, weight: 185.0, date: "10:30 am" }, 
            { reps: 8, weight: 195.0, date: "10:35 am" }
          ] 
        },
      ],
    },
    {
      id: "1712016000000", // Apr 3, 2025 timestamp
      name: "Leg Day",
      date: '4/3/2025',
      exercises: [
        { 
          id: "ex2",
          name: 'Squat', 
          date: '4/3/2025',
          sets: [
            { reps: 10, weight: 275.0, date: "11:30 am" }, 
            { reps: 8, weight: 295.0, date: "11:40 am" }
          ] 
        },
      ],
    },
    {
      id: "1711929600000", // Apr 2, 2025 timestamp
      name: "Pull Day",
      date: '4/2/2025',
      exercises: [
        { 
          id: "ex3",
          name: 'Deadlift', 
          date: '4/2/2025',
          sets: [
            { reps: 6, weight: 335.0, date: "9:15 am" }, 
            { reps: 5, weight: 355.0, date: "9:25 am" }
          ] 
        },
      ],
    },
    {
      id: "1711843200000", // Apr 1, 2025 timestamp
      name: "Shoulder Day",
      date: '4/1/2025',
      exercises: [
        { 
          id: "ex4",
          name: 'Shoulder Press', 
          date: '4/1/2025',
          sets: [
            { reps: 10, weight: 60.0, date: "4:30 pm" }, 
            { reps: 8, weight: 62.5, date: "4:40 pm" }
          ] 
        },
      ],
    },
    {
      id: "1711756800000", // Mar 31, 2025 timestamp
      name: "Push Day",
      date: '3/31/2025',
      exercises: [
        { 
          id: "ex5",
          name: 'Bench Press', 
          date: '3/31/2025',
          sets: [
            { reps: 8, weight: 190.0, date: "10:30 am" }, 
            { reps: 6, weight: 200.0, date: "10:40 am" }
          ] 
        },
      ],
    },
    {
      id: "1711670400000", // Mar 30, 2025 timestamp
      name: "Leg Day",
      date: '3/30/2025',
      exercises: [
        { 
          id: "ex6",
          name: 'Squat', 
          date: '3/30/2025',
          sets: [
            { reps: 8, weight: 285.0, date: "11:30 am" }, 
            { reps: 6, weight: 305.0, date: "11:45 am" }
          ] 
        },
      ],
    },
    {
      id: "1711584000000", // Mar 29, 2025 timestamp
      name: "Pull Day",
      date: '3/29/2025',
      exercises: [
        { 
          id: "ex7",
          name: 'Deadlift', 
          date: '3/29/2025',
          sets: [
            { reps: 6, weight: 345.0, date: "9:15 am" }, 
            { reps: 5, weight: 365.0, date: "9:30 am" }
          ] 
        },
      ],
    },
    {
      id: "1711497600000", // Mar 28, 2025 timestamp
      name: "Shoulder Day",
      date: '3/28/2025',
      exercises: [
        { 
          id: "ex8",
          name: 'Shoulder Press', 
          date: '3/28/2025',
          sets: [
            { reps: 8, weight: 62.5, date: "4:30 pm" }, 
            { reps: 6, weight: 65.0, date: "4:45 pm" }
          ] 
        },
      ],
    },
    {
      id: "1711411200000", // Mar 27, 2025 timestamp
      name: "Push Day",
      date: '3/27/2025',
      exercises: [
        { 
          id: "ex9",
          name: 'Bench Press', 
          date: '3/27/2025',
          sets: [
            { reps: 10, weight: 195.0, date: "10:30 am" }, 
            { reps: 8, weight: 205.0, date: "10:40 am" }
          ] 
        },
      ],
    },
    {
      id: "1711324800000", // Mar 26, 2025 timestamp
      name: "Leg Day",
      date: '3/26/2025',
      exercises: [
        { 
          id: "ex10",
          name: 'Squat', 
          date: '3/26/2025',
          sets: [
            { reps: 10, weight: 300.0, date: "11:30 am" }, 
            { reps: 8, weight: 320.0, date: "11:45 am" }
          ] 
        },
      ],
    },
    {
      id: "1711238400000", // Mar 25, 2025 timestamp
      name: "Pull Day",
      date: '3/25/2025',
      exercises: [
        { 
          id: "ex11",
          name: 'Deadlift', 
          date: '3/25/2025',
          sets: [
            { reps: 6, weight: 360.0, date: "9:15 am" }, 
            { reps: 5, weight: 380.0, date: "9:30 am" }
          ] 
        },
      ],
    },
    {
      id: "1711152000000", // Mar 24, 2025 timestamp
      name: "Shoulder Day",
      date: '3/24/2025',
      exercises: [
        { 
          id: "ex12",
          name: 'Shoulder Press', 
          date: '3/24/2025',
          sets: [
            { reps: 10, weight: 65.0, date: "4:30 pm" }, 
            { reps: 8, weight: 67.5, date: "4:45 pm" }
          ] 
        },
      ],
    },
    {
      id: "1711065600000", // Mar 23, 2025 timestamp
      name: "Push Day",
      date: '3/23/2025',
      exercises: [
        { 
          id: "ex13",
          name: 'Bench Press', 
          date: '3/23/2025',
          sets: [
            { reps: 8, weight: 200.0, date: "10:30 am" }, 
            { reps: 6, weight: 215.0, date: "10:40 am" }
          ] 
        },
      ],
    },
    {
      id: "1710979200000", // Mar 22, 2025 timestamp
      name: "Leg Day",
      date: '3/22/2025',
      exercises: [
        { 
          id: "ex14",
          name: 'Squat', 
          date: '3/22/2025',
          sets: [
            { reps: 8, weight: 310.0, date: "11:30 am" }, 
            { reps: 6, weight: 330.0, date: "11:45 am" }
          ] 
        },
      ],
    },
    {
      id: "1710892800000", // Mar 21, 2025 timestamp
      name: "Pull Day",
      date: '3/21/2025',
      exercises: [
        { 
          id: "ex15",
          name: 'Deadlift', 
          date: '3/21/2025',
          sets: [
            { reps: 6, weight: 370.0, date: "9:15 am" }, 
            { reps: 5, weight: 390.0, date: "9:30 am" }
          ] 
        },
      ],
    },
    {
      id: "1710806400000", // Mar 20, 2025 timestamp
      name: "Shoulder Day",
      date: '3/20/2025',
      exercises: [
        { 
          id: "ex16",
          name: 'Shoulder Press', 
          date: '3/20/2025',
          sets: [
            { reps: 8, weight: 67.5, date: "4:30 pm" }, 
            { reps: 6, weight: 70.0, date: "4:45 pm" }
          ] 
        },
      ],
    },
    {
      id: "1710720000000", // Mar 19, 2025 timestamp
      name: "Push Day",
      date: '3/19/2025',
      exercises: [
        { 
          id: "ex17",
          name: 'Bench Press', 
          date: '3/19/2025',
          sets: [
            { reps: 10, weight: 205.0, date: "10:30 am" }, 
            { reps: 8, weight: 220.0, date: "10:40 am" }
          ] 
        },
      ],
    },
    {
      id: "1710633600000", // Mar 18, 2025 timestamp
      name: "Leg Day",
      date: '3/18/2025',
      exercises: [
        { 
          id: "ex18",
          name: 'Squat', 
          date: '3/18/2025',
          sets: [
            { reps: 10, weight: 325.0, date: "11:30 am" }, 
            { reps: 8, weight: 345.0, date: "11:45 am" }
          ] 
        },
      ],
    },
    {
      id: "1710547200000", // Mar 17, 2025 timestamp
      name: "Pull Day",
      date: '3/17/2025',
      exercises: [
        { 
          id: "ex19",
          name: 'Deadlift', 
          date: '3/17/2025',
          sets: [
            { reps: 6, weight: 380.0, date: "9:15 am" }, 
            { reps: 5, weight: 405.0, date: "9:30 am" }
          ] 
        },
      ],
    },
    {
      id: "1710460800000", // Mar 16, 2025 timestamp
      name: "Shoulder Day",
      date: '3/16/2025',
      exercises: [
        { 
          id: "ex20",
          name: 'Shoulder Press', 
          date: '3/16/2025',
          sets: [
            { reps: 8, weight: 70.0, date: "4:30 pm" }, 
            { reps: 6, weight: 72.5, date: "4:45 pm" }
          ] 
        },
      ],
    },
    {
      id: "1710374400000", // Mar 15, 2025 timestamp
      name: "Push Day",
      date: '3/15/2025',
      exercises: [
        { 
          id: "ex21",
          name: 'Bench Press', 
          date: '3/15/2025',
          sets: [
            { reps: 8, weight: 215.0, date: "10:30 am" }, 
            { reps: 6, weight: 230.0, date: "10:40 am" }
          ] 
        },
      ],
    },
    {
      id: "1710288000000", // Mar 14, 2025 timestamp
      name: "Leg Day",
      date: '3/14/2025',
      exercises: [
        { 
          id: "ex22",
          name: 'Squat', 
          date: '3/14/2025',
          sets: [
            { reps: 8, weight: 335.0, date: "11:30 am" }, 
            { reps: 6, weight: 355.0, date: "11:45 am" }
          ] 
        },
      ],
    },
    {
      id: "1710201600000", // Mar 13, 2025 timestamp
      name: "Pull Day",
      date: '3/13/2025',
      exercises: [
        { 
          id: "ex23",
          name: 'Deadlift', 
          date: '3/13/2025',
          sets: [
            { reps: 6, weight: 390.0, date: "9:15 am" }, 
            { reps: 5, weight: 415.0, date: "9:30 am" }
          ] 
        },
      ],
    },
    {
      id: "1710115200000", // Mar 12, 2025 timestamp
      name: "Shoulder Day",
      date: '3/12/2025',
      exercises: [
        { 
          id: "ex24",
          name: 'Shoulder Press', 
          date: '3/12/2025',
          sets: [
            { reps: 8, weight: 72.5, date: "4:30 pm" }, 
            { reps: 6, weight: 75.0, date: "4:45 pm" }
          ] 
        },
      ],
    },
  ]
};

export default workoutData;