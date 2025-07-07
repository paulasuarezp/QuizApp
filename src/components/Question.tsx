import React from 'react';
import { Question } from '../types';

interface QuestionProps {
    question: Question;
    questionIndex: number;
    selectedAnswer: number;
    showResults: boolean;
    onAnswer: (questionIndex: number, selectedOption: number) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({
    question,
    questionIndex,
    selectedAnswer,
    showResults,
    onAnswer,
}) => {
    const handleOptionClick = (optionIndex: number) => {
        if (!showResults) {
            onAnswer(questionIndex, optionIndex);
        }
    };

    const getOptionClass = (optionIndex: number) => {
        if (showResults) {
            if (optionIndex === question.answer) {
                return 'correct';
            } else if (optionIndex === selectedAnswer && optionIndex !== question.answer) {
                return 'incorrect';
            }
        }
        return '';
    };

    return (
        <div className="question">
            <h3>{`${questionIndex + 1}. ${question.question}`}</h3>
            <ul>
                {question.options.map((option, optionIndex) => (
                    <li
                        key={optionIndex}
                        className={`answer ${getOptionClass(optionIndex)}`}
                        onClick={() => handleOptionClick(optionIndex)}
                    >
                        <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            checked={selectedAnswer === optionIndex}
                            readOnly
                        />
                        <label>{option}</label>
                    </li>
                ))}
            </ul>
            {showResults && question.explanation && (
                <div
                    className="explanation"
                    dangerouslySetInnerHTML={{ __html: question.explanation }}
                />

            )}
        </div>
    );
};

export default QuestionComponent;