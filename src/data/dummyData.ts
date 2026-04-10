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
                    "answerPlaceholder": "Write your answer here..."
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
                        { "id": "opt_d", "label": "D", "text": "Hussain Muhammad Ershad", "isCorrect": false }
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
                    "answerPlaceholder": "Write your answer here..."
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
                    "answerPlaceholder": "Write your answer here..."
                }
            ]
        }
    ]
};

export const exams = dummyData.exams;
export default dummyData;
