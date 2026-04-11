const dummyData = {
    exams: [
        {
            "id": "exam_001",
            "title": "Psychometric Test for Management Trainee Officer",
            "totalCandidates": 10000,
            "totalSlots": 3,
            "totalQuestionSet": 2,
            "durationPerSlotMinutes": 30,
            "questionType": "MCQ",
            "questions": [
                {
                    "id": "q_001",
                    "number": 1,
                    "type": "MCQ",
                    "points": 1,
                    "text": "What is the Capital of Bangladesh?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Dhaka", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Chattogram", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "Rajshahi", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "Barishal", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_002",
                    "number": 2,
                    "type": "Checkbox",
                    "points": 1,
                    "text": "Which are major rivers of Bangladesh?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Padma", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Thames", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "Meghna", "isCorrect": true },
                        { "id": "opt_d", "label": "D", "text": "Nile", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_003",
                    "number": 3,
                    "type": "Text",
                    "points": 5,
                    "text": "Write a brief of your capital city",
                    "options": [],
                    "answerPlaceholder": "Write your answer here...",
                    "correctAnswer": "Dhaka"
                },
                {
                    "id": "q_004",
                    "number": 4,
                    "type": "MCQ",
                    "points": 1,
                    "text": "In which year did Bangladesh gain independence?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "1969", "isCorrect": false },
                        { "id": "opt_b", "label": "B", "text": "1971", "isCorrect": true },
                        { "id": "opt_c", "label": "C", "text": "1973", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "1975", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_005",
                    "number": 5,
                    "type": "Checkbox",
                    "points": 2,
                    "text": "Which of these cities are in Bangladesh?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Sylhet", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Kolkata", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "Khulna", "isCorrect": true },
                        { "id": "opt_d", "label": "D", "text": "Mumbai", "isCorrect": false }
                    ]
                }
            ]
        },
        {
            "id": "exam_002",
            "title": "General Knowledge Test for Senior Executive Officer",
            "totalCandidates": 5000,
            "totalSlots": 2,
            "totalQuestionSet": 3,
            "durationPerSlotMinutes": 45,
            "questionType": "Mixed",
            "questions": [
                {
                    "id": "q_001",
                    "number": 1,
                    "type": "MCQ",
                    "points": 1,
                    "text": "Who is the Father of the Nation of Bangladesh?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Sheikh Mujibur Rahman", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Ziaur Rahman", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "A.K. Fazlul Huq", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "H.M. Ershad", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_002",
                    "number": 2,
                    "type": "Checkbox",
                    "points": 2,
                    "text": "Which of the following are freedom fighter liberation sectors of Bangladesh?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Sector 1", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Sector 5", "isCorrect": true },
                        { "id": "opt_c", "label": "C", "text": "Sector 15", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "Sector 11", "isCorrect": true }
                    ]
                },
                {
                    "id": "q_003",
                    "number": 3,
                    "type": "Text",
                    "points": 5,
                    "text": "Describe the significance of the Language Movement of 1952.",
                    "options": [],
                    "answerPlaceholder": "Write your answer here...",
                    "correctAnswer": "Liberation"
                },
                {
                    "id": "q_004",
                    "number": 4,
                    "type": "MCQ",
                    "points": 1,
                    "text": "In which city was the Language Movement of 1952 centred?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Chittagong", "isCorrect": false },
                        { "id": "opt_b", "label": "B", "text": "Rajshahi", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "Dhaka", "isCorrect": true },
                        { "id": "opt_d", "label": "D", "text": "Sylhet", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_005",
                    "number": 5,
                    "type": "MCQ",
                    "points": 1,
                    "text": "What is the national anthem of Bangladesh?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Amar Sonar Bangla", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Joy Bangla", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "Ekusher Gaan", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "Notuner Gaan", "isCorrect": false }
                    ]
                }
            ]
        },
        {
            "id": "exam_003",
            "title": "Aptitude Test for Junior Analyst",
            "totalCandidates": 8000,
            "totalSlots": 4,
            "totalQuestionSet": 2,
            "durationPerSlotMinutes": 60,
            "questionType": "MCQ",
            "questions": [
                {
                    "id": "q_001",
                    "number": 1,
                    "type": "MCQ",
                    "points": 1,
                    "text": "If a train travels 120 km in 2 hours, what is its speed?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "50 km/h", "isCorrect": false },
                        { "id": "opt_b", "label": "B", "text": "60 km/h", "isCorrect": true },
                        { "id": "opt_c", "label": "C", "text": "70 km/h", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "80 km/h", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_002",
                    "number": 2,
                    "type": "Checkbox",
                    "points": 2,
                    "text": "Which of the following are prime numbers?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "2", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "9", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "13", "isCorrect": true },
                        { "id": "opt_d", "label": "D", "text": "21", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_003",
                    "number": 3,
                    "type": "Text",
                    "points": 5,
                    "text": "Explain the concept of data normalization in databases.",
                    "options": [],
                    "answerPlaceholder": "Write your answer here...",
                    "correctAnswer": "Normalization"
                },
                {
                    "id": "q_004",
                    "number": 4,
                    "type": "MCQ",
                    "points": 1,
                    "text": "What is 15% of 200?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "25", "isCorrect": false },
                        { "id": "opt_b", "label": "B", "text": "30", "isCorrect": true },
                        { "id": "opt_c", "label": "C", "text": "35", "isCorrect": false },
                        { "id": "opt_d", "label": "D", "text": "40", "isCorrect": false }
                    ]
                },
                {
                    "id": "q_005",
                    "number": 5,
                    "type": "Checkbox",
                    "points": 2,
                    "text": "Which of these are sorting algorithms?",
                    "options": [
                        { "id": "opt_a", "label": "A", "text": "Bubble Sort", "isCorrect": true },
                        { "id": "opt_b", "label": "B", "text": "Binary Tree", "isCorrect": false },
                        { "id": "opt_c", "label": "C", "text": "Merge Sort", "isCorrect": true },
                        { "id": "opt_d", "label": "D", "text": "Hash Map", "isCorrect": false }
                    ]
                }
            ]
        }
    ]
};

export const exams = dummyData.exams;
export default dummyData;