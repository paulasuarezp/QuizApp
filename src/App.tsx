import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import SelectQuiz from './components/SelectQuiz';
import CRC from './data/CRC.json';
import DSSAC2024 from './data/DSSAC-2024.json';
import DSSAC2025 from './data/DSSAC-2025.json';
import DSSAC from './data/DSSAC.json';
import GCAR from './data/GCAR.json';
import HEAM from './data/HEAM.json';
import IFRI from './data/IFRI.json';
import SRAIA from './data/SRAIA.json';
import SSABD from './data/SSABD.json';
import './index.css';
import { Question, QuizData } from './types';


const quizData: QuizData = {
  SSABD,
  SRAIA,
  IFRI,
  GCAR,
  CRC,
  HEAM,
  DSSAC,
  'DSSAC-2025': DSSAC2025,
  'DSSAC-2024': DSSAC2024,
};
const App: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Question[] | null>(null);
  const [quizName, setQuizName] = useState<string | null>(null);

  const handleSelectQuiz = (quizKey: string, quizLabel: string) => {
    setQuizName(quizLabel); // Guardar el nombre del quiz
    setSelectedQuiz(quizData[quizKey]);
  };

  const handleRestart = () => {
    setSelectedQuiz(null);
    setQuizName(null);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <SelectQuiz onSelectQuiz={handleSelectQuiz} />
      {selectedQuiz && quizName && (
        <Quiz questions={selectedQuiz} quizName={quizName} onRestart={handleRestart} />
      )}
    </div>
  );
};


export default App;