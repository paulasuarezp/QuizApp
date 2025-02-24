import React, { useState } from 'react';
import Quiz from './components/Quiz';
import SelectQuiz from './components/SelectQuiz';
import CRC from './data/CRC.json';
import GCAR from './data/GCAR.json';
import IFRI from './data/IFRI.json';
import SRAIA from './data/SRAIA.json';
import SSABD from './data/SSABD.json';
import { Question, QuizData } from './types';

const quizData: QuizData = {
  SSABD,
  SRAIA,
  IFRI,
  GCAR,
  CRC
};


const App: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Question[] | null>(null);

  const handleSelectQuiz = (quizKey: string) => {
    setSelectedQuiz(quizData[quizKey]);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <SelectQuiz onSelectQuiz={handleSelectQuiz} />
      {selectedQuiz && <Quiz questions={selectedQuiz} />}
    </div>
  );
};

export default App;