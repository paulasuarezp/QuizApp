import React, { useEffect, useState } from 'react';
import { Question } from '../types';
import QuestionComponent from './Question';

interface QuizProps {
    questions: Question[];
    quizName: string; // Nombre del quiz seleccionado
    onRestart: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, quizName, onRestart }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
    const [showResults, setShowResults] = useState(false);
    const [examMode, setExamMode] = useState(false);
    const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

    // Reiniciar el cuestionario cuando cambian las preguntas
    useEffect(() => {
        setSelectedAnswers(Array(questions.length).fill(-1));
        setShowResults(false);
        if (examMode) {
            selectRandomQuestions();
        }
    }, [questions, examMode]);

    const selectRandomQuestions = () => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        setRandomQuestions(shuffled.slice(0, 10));
    };

    const handleAnswer = (questionIndex: number, selectedOption: number) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = selectedOption;
        setSelectedAnswers(newSelectedAnswers);
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        const questionsToUse = examMode ? randomQuestions : questions;
        questionsToUse.forEach((question, index) => {
            if (selectedAnswers[index] === question.answer) {
                correctAnswers++;
            }
        });
        return (correctAnswers / questionsToUse.length) * 10; // Puntaje sobre 10
    };

    const handleFinish = () => {
        setShowResults(true);
    };

    const handleRestart = () => {
        setSelectedAnswers(Array(questions.length).fill(-1));
        setShowResults(false);
        onRestart();
    };

    const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExamMode(event.target.value === 'exam');
        if (event.target.value === 'exam') {
            selectRandomQuestions();
        }
    };

    const questionsToDisplay = examMode ? randomQuestions : questions;

    return (
        <div id="app">
            <h1>{quizName}</h1> {/* Mostrar el nombre del quiz */}
            <div>
                <label htmlFor="mode">Modo: </label>
                <select id="mode" onChange={handleModeChange}>
                    <option value="all">Todas las preguntas</option>
                    <option value="exam">Modo Examen (10 preguntas)</option>
                </select>
            </div>
            <div id="question-container">
                {questionsToDisplay.map((question, index) => (
                    <QuestionComponent
                        key={index}
                        question={question}
                        questionIndex={index}
                        selectedAnswer={selectedAnswers[index]}
                        showResults={showResults}
                        onAnswer={handleAnswer}
                    />
                ))}
            </div>
            {!showResults && (
                <button className="btn" onClick={handleFinish}>
                    Finalizar
                </button>
            )}
            {showResults && (
                <div>
                    <h2>Resultado</h2>
                    <p>
                        Puntuación: {calculateScore().toFixed(2)} / 10 ({calculateScore().toFixed(2)} preguntas correctas de {questionsToDisplay.length})
                    </p>
                    <button className="btn" onClick={handleRestart}>
                        Reiniciar Cuestionario
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;