import React, { useState } from 'react';
import { Question } from '../types';
import QuestionComponent from './Question';

interface QuizProps {
    questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (selectedOption: number) => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div>
            {showResult ? (
                <div>
                    <h2>Resultado</h2>
                    <p>Puntuación: {score} / {questions.length}</p>
                </div>
            ) : (
                <QuestionComponent
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    );
};

export default Quiz;