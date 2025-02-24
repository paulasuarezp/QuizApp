import React from 'react';
import { Question } from '../types';

interface QuestionProps {
    question: Question;
    onAnswer: (selectedOption: number) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, onAnswer }) => {
    return (
        <div>
            <h3>{question.question}</h3>
            {question.options.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value={index}
                            onChange={() => onAnswer(index)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default QuestionComponent;