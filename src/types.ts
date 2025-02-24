export interface Question {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
}

export interface QuizData {
    [key: string]: Question[];
}